import {
  PersonType
} from '../graphql/generated';
import { EPersonType } from '@edmit/component-library/src/shared'

export enum ESessionType {
  ANONYMOUS = 'ANONYMOUS',
  KNOWN = 'KNOWN'
}

export function personTypeFromGraphQL(gqlType: PersonType | null): EPersonType {
  switch (gqlType) {
    case PersonType.Student:
      return EPersonType.STUDENT;
    case PersonType.Parent:
      return EPersonType.PARENT;
    case PersonType.Other:
      return EPersonType.OTHER;
  }

  return EPersonType.PARENT;
}

export function personTypeToGraphQL(type: EPersonType): PersonType {
  switch (type) {
    case EPersonType.STUDENT:
      return PersonType.Student;
    case EPersonType.PARENT:
      return PersonType.Parent;
    case EPersonType.OTHER:
      return PersonType.Other;
  }
}
