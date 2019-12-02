import * as Cookies from 'js-cookie';

export interface ICookieReader {
  readCookie(name: string): string | null;
}

export interface ICookieWriter {
  writeCookie(
    name: string,
    value: string | null,
    ttlInMilliseconds?: number,
    domain?: string
  ): void;
}

export interface ICookieDeleter {
  deleteCookie(name: string, domain?: string): void;
}

export class CookieService implements ICookieReader, ICookieWriter, ICookieDeleter {
  deleteCookie(name: string, domain?: string) {
    return Cookies.remove(name, {
      domain
    });
  }

  readCookie(name: string): string | null {
    return Cookies.get(name) as string;
  }

  writeCookie(name: string, value: string, ttlInMilliseconds?: number, domain?: string) {
    Cookies.set(name, value, {
      domain,
      expires: 365 * 10
    });
  }
}
