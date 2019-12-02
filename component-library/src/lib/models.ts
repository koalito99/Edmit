import { useState } from 'react';
import { CollegeFragment } from '../../../client/src/graphql/generated';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type OmitDistributive<T, K> = T extends any ? (T extends object ? Id<OmitRecursively<T, K>> : T) : never;
type Id<T> = {} & { [P in keyof T]: T[P] } // Cosmetic use only makes the tooltips expad the type can be removed 
type OmitRecursively<T extends any, K> = Omit<
  { [P in keyof T]: OmitDistributive<T[P], K> },
  K
>

export type StudentId = string;
export type PersonId = string;
export type CollegeId = string;
export type HighSchoolId = string;
export type PostalCodeId = string;
export type AccountId = string;
export type SessionId = string;
export type ProductId = string;
export type PlanId = string;

export type CollegeModel = OmitRecursively<CollegeFragment, "__typename">

export type StripeToken = string;

interface IAppliedProduct {
  id: ProductId;
  name: string;
}

export type AppliedProduct = IAppliedProduct;

export type SessionToken = string;
export type Nullable<T> = T | null | undefined;

export const useNullableState = <T>(initial: Nullable<T> = null) => useState<Nullable<T>>(initial);

export const useBooleanState = (initial: boolean = false) => useState(initial);

export enum EAtomicBoolean {
  NotSet,
  True,
  False
}

export const useAtomicBoolean = (initial: EAtomicBoolean = EAtomicBoolean.NotSet) => {
  const [value, setValue] = useState(initial);

  const setTrue = () => setValue(EAtomicBoolean.True);
  const setFalse = () => setValue(EAtomicBoolean.False);
  const unset = () => setValue(EAtomicBoolean.NotSet);

  const set = (v: boolean) => (v ? setTrue() : setFalse());

  return {
    value,
    setTrue,
    setFalse,
    unset,
    set
  };
};

export const normalizeId = (id: string) => id.toLowerCase();
