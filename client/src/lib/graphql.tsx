import * as React from 'react';
import { ApolloLink, Observable } from 'apollo-link';
import { OperationDefinitionNode } from 'graphql';
import { isEqual } from 'lodash';
import ErrorPage from '../components/pages/error';
import { print } from 'graphql/language/printer';
import { DocumentNode, getOperationAST } from 'graphql';
import store from '../store';
import actions from '../store/rootActions';
import * as PropTypes from 'prop-types';
import { Nullable, StudentId } from '@edmit/component-library/src/lib/models'
import { OperationVariables } from 'apollo-client'
import { QueryHookOptions, useQuery } from 'react-apollo-hooks'
import { useAuthentication } from '../hooks/auth';

export interface IUseArbitraryQueryReturn<TData> {
  data: TData | null;
  loading: boolean;
  refetching: boolean;
  refetch: () => Promise<void>;
}

export function useArbitraryQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options: QueryHookOptions<TVariables, object>,
  debugName?: string
): IUseArbitraryQueryReturn<TData> {
  const q = useQuery<TData, TVariables>(query, options);

  const [data, setData] = React.useState<TData | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [refetching, setRefetching] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (q.data) {
      if (debugName) {
        console.log(`[${debugName}]: Data Changed`)
        console.log(q.data)
      }
      setData(q.data);
    }

    if (!loaded) {
      setLoading(q.loading);
    }

    if (!q.loading && data) {
      if (debugName) {
        console.log(`[${debugName}]: Loaded`)
        console.log(q.data)
      }
      setLoaded(true);
      setLoading(false);
    }
  }, [q]);

  return {
    data,
    loading,
    refetching,
    refetch: async () => {
      setRefetching(true);
      await q.refetch()
      setRefetching(false);
    }
  };
}

export const studentQueryProperties = (studentId: Nullable<StudentId>) => function <T>(variables: T, skip = false) {
  return {
    // We skip if the student id is not present, but for TS purposes, assert that it is present in `variables`
    skip: !studentId || skip,
    variables: {
      ...variables,
      studentId: studentId!
    }
  };
};

export const loggerLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: ZenObservable.Subscription;
      Promise.resolve(operation)
        .then(oper => {
          const operationType = (oper.query.definitions[0] as OperationDefinitionNode).operation;

          if (operationType === 'query') {
            store.dispatch(
              actions.queryStarted({
                name: oper.operationName,
                query: print(oper.query),
                variables: oper.variables
              })
            );
          } else if (operationType === 'mutation') {
            store.dispatch(
              actions.mutationStarted({
                mutation: print(oper.query),
                name: oper.operationName,
                variables: oper.variables
              })
            );
          }

          return operationType;
        })
        .then(operationType => {
          if (forward) {
            handle = forward(operation).subscribe({
              complete: observer.complete.bind(observer),
              error: err => {
                if (operationType === 'query') {
                  store.dispatch(
                    actions.queryError({
                      error: new Error(err),
                      name: operation.operationName
                    })
                  );
                } else if (operationType === 'mutation') {
                  store.dispatch(
                    actions.mutationError({
                      error: new Error(err),
                      name: operation.operationName
                    })
                  );
                }

                return observer.error.bind(observer)(err);
              },
              next: value => {
                if (operationType === 'query') {
                  store.dispatch(
                    actions.queryResultReceived({
                      name: operation.operationName,
                      response: value
                    })
                  );
                } else if (operationType === 'mutation') {
                  store.dispatch(
                    actions.mutationResultReceived({
                      name: operation.operationName,
                      response: value
                    })
                  );
                }

                return observer.next.bind(observer)(value);
              }
            });
          }
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) {
          handle.unsubscribe();
        }
      };
    })
);

// old Query components ------------------------

const graphQLEndpoint = process.env.REACT_APP_API_GRAPHQL_PATH;

if (graphQLEndpoint === null || graphQLEndpoint === undefined) {
  throw Error('unexpected - missing graphql endpoint');
}

export interface IFetchQueryResult<TData = any> {
  data: TData | null;
  error: any | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

interface IFetchQueryProps<TData = any, TVariables = {}> {
  children: (result: IFetchQueryResult<TData>) => React.ReactNode;
  query: DocumentNode;
  variables?: TVariables;

  loadingComponent?: JSX.Element;
  errorComponent?: JSX.Element;
  defer?: boolean;
  disabled?: boolean;
}

interface IFetchQueryState<TData = any> {
  loading: boolean;
  error: Error | null;
  data: TData | null;
}

export const Mutation = <TData extends any = any, TVariables extends {} = {}>(props: IFetchMutationProps<TData, TVariables>) => {
  const auth = useAuthentication()

  return <RawMutation {...props} sessionId={auth.sessionId} token={auth.token} />
}

export const Query = <TData extends any = any, TVariables extends {} = {}>(props: IFetchQueryProps<TData, TVariables>) => {
  const auth = useAuthentication()

  return <RawQuery {...props} sessionId={auth.sessionId} token={auth.token} />
}

// noinspection TsLint
class RawQuery<TData = any, TVariables = {}> extends React.Component<
  IFetchQueryProps<TData, TVariables> & { sessionId: Nullable<string>, token: Nullable<string> },
  IFetchQueryState<TData>
  > {
  static contextTypes = {
    getAuthentication: PropTypes.func
  };

  // @ts-ignore
  context: IAuthProviderContext;

  readonly state = {
    data: null,
    error: null,
    loading: false
  };

  componentDidMount() {
    if (!this.props.defer && !this.props.disabled) {
      this.fetch();
    }
  }

  componentWillReceiveProps(newProps: IFetchQueryProps<TData, TVariables>) {
    if (
      (!isEqual(newProps.variables, this.props.variables) && !this.props.disabled) ||
      (newProps.disabled === false && this.props.disabled)
    ) {
      this.fetch(newProps.variables);
    }
  }

  async fetch(variables = this.props.variables) {
    const operation = getOperationAST(this.props.query);

    this.setState({ loading: true });
    store.dispatch(
      actions.queryStarted({
        name: operation.name && operation.name.value,
        query: print(operation),
        variables
      })
    );

    try {
      const { sessionId, token } = this.props;

      if (sessionId && token) {
        const response = await (await window.fetch(graphQLEndpoint!, {
          body: JSON.stringify({
            query: print(this.props.query),
            variables
          }),
          headers: {
            'Content-Type': 'application/json',
            'X-Edmit-Session-Id': sessionId,
            'X-Edmit-Token': token
          },
          method: 'POST'
        })).json();

        store.dispatch(
          actions.queryResultReceived({ name: operation.name && operation.name.value, response })
        );
        this.setState({ loading: false, data: (response as any).data });
      }


    } catch (error) {
      // TODO record and log error here
      const ex: Error = error;

      store.dispatch(
        actions.queryError({
          error: { name: ex.name, message: ex.message, stack: ex.stack },
          name: operation.name && operation.name.value
        })
      );
      this.setState({ loading: false, error });
    }
  }

  render() {
    if (this.state.error != null) {
      console.error(this.state.error || "Query error")

      const errorComponent = this.props.errorComponent || <ErrorPage />;

      if (errorComponent) {
        return errorComponent;
      }
    }

    return this.props.children({
      data: this.state.data,
      error: this.state.error,
      loading: this.state.loading,
      refetch: (newVariables?: TVariables) => this.fetch(newVariables)
    });
  }
}

interface IFetchMutationProps<TData = any, TVariables = {}> {
  children: (
    mutation: (input: { variables: TVariables; optimisticResponse?: any }) => Promise<TData>,
    mutationResult: { data: TData | null; error: any | null; loading: boolean; clear: () => void }
  ) => React.ReactNode;
  mutation: DocumentNode;
  loadingComponent?: JSX.Element;
  errorComponent?: JSX.Element;
}

interface IFetchMutationState<TData = any> {
  loading: boolean;
  error: Error | null;
  data: TData | null;
}

// noinspection TsLint
export class RawMutation<TData = any, TVariables = {}> extends React.Component<
  IFetchMutationProps<TData, TVariables> & { sessionId: Nullable<string>, token: Nullable<string> },
  IFetchMutationState<TData>
  > {
  static contextTypes = {
    getAuthentication: PropTypes.func
  };

  // @ts-ignore
  context: IAuthProviderContext;

  readonly state = {
    data: null,
    error: null,
    loading: false
  };

  render() {
    if (this.state.loading && this.props.loadingComponent != null) {
      return this.props.loadingComponent;
    }

    if (this.state.error != null) {
      console.error(this.state.error || "Mutation error")

      const errorComponent = this.props.errorComponent || <ErrorPage />;

      if (errorComponent) {
        return errorComponent;
      }
    }

    return this.props.children(
      async input => {
        const operation = getOperationAST(this.props.mutation);

        this.setState({ loading: true });
        store.dispatch(
          actions.mutationStarted({
            mutation: print(operation),
            name: operation.name && operation.name.value,
            variables: input.variables
          })
        );

        try {
          const { sessionId, token } = await this.props;

          const response = await (await window.fetch(graphQLEndpoint!, {
            body: JSON.stringify({
              query: print(this.props.mutation),
              variables: input.variables
            }),
            headers: {
              'Content-Type': 'application/json',
              'X-Edmit-Session-Id': sessionId || "",
              'X-Edmit-Token': token || ""
            },
            method: 'POST'
          })).json();

          store.dispatch(
            actions.mutationResultReceived({
              name: operation.name && operation.name.value,
              response
            })
          );

          const data = (response as any).data as TData;

          this.setState({ loading: false, data });
          return Promise.resolve(data);
        } catch (error) {
          console.log(error);
          const ex: Error = error;

          store.dispatch(
            actions.mutationError({
              error: { name: ex.name, message: ex.message, stack: ex.stack },
              name: operation.name && operation.name.value
            })
          );
          this.setState({ loading: false, error });
          return Promise.reject(error);
        }
      },
      {
        clear: () => {
          this.setState({
            data: null,
            error: null,
            loading: false
          });
        },
        data: this.state.data,
        error: this.state.error,
        loading: this.state.loading
      }
    );
  }
}
