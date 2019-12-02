// @ts-ignore
export type NonNullable<T extends any> = Diff<T, null | undefined>;

// FIXME: this can't be compared to partial for some reason
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer V>
      ? ReadonlyArray<DeepPartial<V>>
      // tslint:disable-next-line:ban-types
      : T[P] extends Function ?
        T[P]
        : T[P] extends object ?
          DeepPartial<T[P]> :
          T[P]
};

export type Diff<T extends string | number | symbol, U extends string | number | symbol> = ({
  [P in T]: P
} &
  { [P in U]: never } & { [x: string]: never })[T];
export type Subtract<T, U> = Pick<T, Diff<keyof T, keyof U>>;

export function nextInObj<T>(value: T, offset: number = 1, obj: any): T {
  const keys = Object.keys(obj);
  const currentIndex = keys.findIndex(key => obj[key] === value);

  return obj[keys[currentIndex + offset]];
}

export function nextInLoopingObj<T>(value: T, offset: number = 1, obj: any): T {
  const keys = Object.keys(obj);
  const currentIndex = keys.findIndex(key => obj[key] === value);

  const stepFromIndex = offset > 0 ? 0 : keys.length;

  return obj[keys[(stepFromIndex + currentIndex + offset) % keys.length]];
}

export type ExtractPropsFromStatelessComponent<Type> = Type extends React.StatelessComponent<
  infer P
>
  ? P
  : null;

export type ExtractPropsFromComponent<Type> = Type extends React.ComponentType<infer P> ? P : null;

export type ExtractStateFromStatefulComponent<Type> = Type extends React.Component<infer P, infer S>
  ? S
  : null;

export type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;

export function isEmpty(obj: any): boolean {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
