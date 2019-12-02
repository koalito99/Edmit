import { EventTypes } from 'redux-segment';

export interface IAction<T extends string> {
  type: T;
}

export interface IActionWithPayload<T extends string, P> extends IAction<T> {
  payload: P;
}

export function createAction<T extends string>(type: T): IAction<T>;
export function createAction<T extends string, P>(
  type: T,
  payload?: P,
  track?: ((payload: P) => Partial<P>) | false
): IActionWithPayload<T, P>;
export function createAction<T extends string, P>(
  type: T,
  payload: P,
  track?: ((payload: P) => Partial<P>) | false
): IActionWithPayload<T, P>;
export function createAction<T extends string, P>(
  type: T,
  payload?: P,
  track: ((payload: P) => Partial<P>) | false = pl => pl
) {
  return {
    meta:
      track !== false
        ? {
            analytics: {
              eventPayload: {
                event: 'Redux Action Dispatched',
                properties: {
                  action: type,
                  payload: payload ? track(payload) : undefined
                }
              },
              eventType: EventTypes.track
            }
          }
        : undefined,
    payload,
    type
  };
}

type FunctionType = (...args: any[]) => any;
interface IActionCreatorsMapObject {
  [actionCreator: string]: FunctionType;
}
export type ActionsUnion<A extends IActionCreatorsMapObject> = ReturnType<A[keyof A]>;
