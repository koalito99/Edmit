import * as React from "react";
import { CookieService } from "../lib/cookie";
import { EDMIT_SESSION_ID_COOKIE_NAME, EDMIT_TOKEN_COOKIE_NAME } from "..";
import { useNullableState, Nullable } from "@edmit/component-library/src/lib/models";
import * as qs from 'query-string';
import { CREATE_SESSION_FROM_TOKEN } from "../graphql/mutations";
import { print } from "graphql";
import { CreateSessionFromToken } from "../graphql/generated";

interface IViewer {
  status: string;
  type?: string | null;
  accountId?: string | null;
  emailAddress?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  hasPassword?: boolean;
  studentId?: string | null;
}

interface ICreateSessionResponse {
  sessionId: string;
  sessionToken: string;
}

interface ICredentials {
  sessionId: string;
  token: string;
}

const defaultAuthValue: IAuthenticationContext = {
  loading: false,
  hasCredentials: false,
  hasPassword: null,
  persistCredentials: () => { },
  logout: (redirect: string) => { }
}

const AuthContext = React.createContext<IAuthenticationContext>(defaultAuthValue)

const cookieService = new CookieService()

export enum EAuthenticationAccountType {
  Known,
  Anonymous
}

interface IAuthenticationContext {
  sessionId?: string | null | undefined;
  loading: boolean;
  hasCredentials: boolean;
  token?: string | null | undefined;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  emailAddress?: string | null | undefined;
  accountId?: string | null | undefined;
  studentId?: string | null | undefined;
  hasPassword: boolean | null;
  type?: Nullable<EAuthenticationAccountType>;
  logout: (redirect: string) => void;
  persistCredentials: (sessionId: string, token: string) => void;
}

export const useAuthenticationState = (): IAuthenticationContext => {
  const [fetchingCredentials, setFetchingCredentials] = React.useState(false)
  const [credentialsFetched, setCredentialsFetched] = React.useState(false)
  const [hasCredentials, setHasCredentials] = React.useState(false)
  const [urlToken, setUrlToken] = useNullableState<string>(null)
  const [credentials, setCredentials] = useNullableState<ICredentials>(null)
  const [firstName, setFirstName] = useNullableState<string>(null)
  const [lastName, setLastName] = useNullableState<string>(null)
  const [emailAddress, setEmailAddress] = useNullableState<string>(null)
  const [accountId, setAccountId] = useNullableState<string>(null)
  const [type, setType] = useNullableState<EAuthenticationAccountType>(null);
  const [hasPassword, setHasPassword] = useNullableState<boolean>(null);
  const [studentId, setStudentId] = useNullableState<string>(null);

  const logout = (redirect: string) => {
    cookieService.deleteCookie(EDMIT_TOKEN_COOKIE_NAME, process.env.REACT_APP_COOKIE_DOMAIN)
    cookieService.deleteCookie(EDMIT_SESSION_ID_COOKIE_NAME, process.env.REACT_APP_COOKIE_DOMAIN)
    return window.location.href = redirect;
  }

  const persistCredentials = (sessionId: string, token: string) => {
    setCredentials(
      {
        sessionId,
        token
      }
    )
    cookieService.writeCookie(EDMIT_SESSION_ID_COOKIE_NAME, sessionId, undefined, process.env.REACT_APP_COOKIE_DOMAIN)
    cookieService.writeCookie(EDMIT_TOKEN_COOKIE_NAME, token, undefined, process.env.REACT_APP_COOKIE_DOMAIN)
  }

  const createSessionFromToken = async (accountToken: string) => {
    const endpoint = process.env.REACT_APP_GRAPHQL_URL
    if (!endpoint) throw Error()

    const createdSession = (await (await window.fetch(
      endpoint, {
        body: JSON.stringify({
          query: print(CREATE_SESSION_FROM_TOKEN),
          variables: {
            accountToken
          }
        }),
        headers: {},
        method: 'POST'
      })).json()) as { data: CreateSessionFromToken };

    persistCredentials(
      createdSession.data.createSessionFromToken.session.id,
      createdSession.data.createSessionFromToken.rawToken
    )
  }

  const retrieveSession = async () => {
    if (!credentials) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/viewer`,
        {
          headers: {
            'X-Edmit-Session-Id': credentials.sessionId,
            'X-Edmit-Token': credentials.token
          }
        }
      )

      const viewer = (await response.json()) as IViewer

      if (viewer.status === "valid") {
        setFirstName(viewer.firstName)
        setLastName(viewer.lastName)
        setEmailAddress(viewer.emailAddress)
        setAccountId(viewer.accountId)
        if (viewer.type === "known") {
          setType(EAuthenticationAccountType.Known)
        } else if (viewer.type === "anonymous") {
          setType(EAuthenticationAccountType.Anonymous)
        }
        setStudentId(viewer.studentId)
        setHasPassword(viewer.hasPassword)
      } else if (viewer.status === "invalid") {
        logout(`/login?returnTo=${window.location.pathname}`)
      }
    } catch (exception) {
      console.error(exception);
    }
  }

  const createSession = async () => {
    setFetchingCredentials(true)

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/session`,
      {
        method: 'POST'
      }
    )

    const session = (await response.json()) as ICreateSessionResponse

    const newSessionId = session.sessionId
    const newToken = session.sessionToken

    persistCredentials(newSessionId, newToken)

    setFetchingCredentials(false)
    setHasCredentials(true)

    return {
      sessionId: newSessionId,
      token: newToken
    }
  }

  React.useEffect(() => {
    setCredentialsFetched(false)

    const querystring = qs.parse(window.location.search);
    const accountToken = querystring.token as string;

    if (accountToken) {
      setUrlToken(accountToken)
    } else {
      const cookieSessionId = cookieService.readCookie(EDMIT_SESSION_ID_COOKIE_NAME)
      const cookieToken = cookieService.readCookie(EDMIT_TOKEN_COOKIE_NAME)

      if (cookieSessionId && cookieToken) {
        persistCredentials(cookieSessionId, cookieToken)
      }
    }

    setCredentialsFetched(true)
  }, [])

  React.useEffect(() => {
    if (!credentialsFetched) return;

    if (urlToken) {
      createSessionFromToken(urlToken)
    } else if (!urlToken && !credentials) {
      createSession()
    }

    return;
  }, [urlToken, credentials, credentialsFetched])

  React.useEffect(() => {
    retrieveSession()
  }, [credentials])

  return {
    sessionId: credentials ? credentials.sessionId : null,
    loading: fetchingCredentials,
    hasCredentials,
    token: credentials ? credentials.token : null,
    firstName,
    lastName,
    emailAddress,
    accountId,
    persistCredentials,
    studentId,
    hasPassword: hasPassword || false,
    logout,
    type
  }
}

export const AuthenticationProvider: React.FC = (props) => {
  const authentication = useAuthenticationState()

  return (
    <AuthContext.Provider
      value={authentication}
    >
      {(authentication.sessionId && authentication.token) ? props.children : null}
    </AuthContext.Provider>
  )
}

export const useAuthentication = () => React.useContext(AuthContext) 