import * as React from 'react';

import { EAtomicBoolean, useAtomicBoolean } from '@edmit/component-library/src/lib/models';
import { useMutation } from 'react-apollo-hooks';
import {
  ProfileUpdateInput,
  UpdateProfile,
  UpdateProfileVariables
} from '../../../graphql/generated';
import { UPDATE_PROFILE } from '../../../graphql/mutations';
import { useStudentSwitcher } from '../../../hooks/student-switcher';
import { useSmartFieldQuery } from './queries';
import { useSmartValue } from '../smart-values/shared';

export interface ISmartFormFields {
  efc: number | null;
  gpa: string | null;
  sat: number | null;
  psat: number | null;
  act: number | null;
  hhi: number | null;
  savings: number | null;
  workstudy: number | null;
  major: {
    selectedMajorId: string | null;
    majors: Array<{ id: string; name: string; }> | null;
  };
  highSchool: {
    id: string;
    name: string;
    zipCode: string;
  } | null;
}

interface ISmartFormFieldsCache {
  fieldCache: Partial<ISmartFormFields>;
  setField<F extends keyof ISmartFormFields>(field: F, value: ISmartFormFields[F]): void;
  unsetField<F extends keyof ISmartFormFields>(field: F): void;
}

const SmartFieldCacheContext = React.createContext<ISmartFormFieldsCache>({
  fieldCache: {},
  setField<F extends keyof ISmartFormFields>(field: F, value: ISmartFormFields[F]): void {},
  unsetField<F extends keyof ISmartFormFields>(field: F): void {}
});

const useSmartFieldCache = () => React.useContext(SmartFieldCacheContext)

export const SmartFieldCacheProvider: React.FC = props => {
  const [fieldCache, setFieldCache] = React.useState<ISmartFormFieldsCache["fieldCache"]>({});

  return <SmartFieldCacheContext.Provider value={{
    fieldCache: fieldCache,
    setField<F extends keyof ISmartFormFields>(field: F, value: ISmartFormFields[F]): void {
      setFieldCache(oldCache => ({
        ...oldCache,
        [field]: value
      }))
    },
    unsetField<F extends keyof ISmartFormFields>(field: F): void {
      setFieldCache(oldCache => ({
        ...oldCache,
        [field]: undefined
      }))
    }
  }}>
    {props.children}
  </SmartFieldCacheContext.Provider>;
};

// function useSmartFieldState<F extends keyof ISmartFormFields>(
//   field: F,
//   initialValue: ISmartFormFields[F]
// ): [ISmartFormFields[F], Dispatch<SetStateAction<ISmartFormFields[F]>>] {
//   const [state, setState] = React.useState<ISmartFormFields[F]>(initialValue);
//
//   React.useEffect(() => {
//     setState(initialValue);
//   }, [initialValue]);
//
//   return [state, setState];
// }

export interface IUseSmartFieldReturn<F extends keyof ISmartFormFields> {
  refetching: boolean;
  saving: boolean;
  loading: boolean;

  value: ISmartFormFields[F] | undefined;
  onChange: (newValue: ISmartFormFields[F]) => void;
  onBlur: (possibleNewValue?: ISmartFormFields[F]) => void;
}

export function useSmartField<F extends keyof ISmartFormFields>(field: F): IUseSmartFieldReturn<F> {
  const smartFieldCache = useSmartFieldCache();
  const smartValueContext = useSmartValue();

  const shouldDoInitialFetch = smartFieldCache.fieldCache[field] === undefined
  const { studentId } = useStudentSwitcher();

  const [refetching, setRefetching] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const { useFieldQuery, profileUpdateData } = useSmartFieldQuery(field);
  const fieldQuery = useFieldQuery(studentId, !shouldDoInitialFetch);

  // update cache if new data is received
  React.useEffect(() => {
    if (!fieldQuery.loading && fieldQuery.data !== undefined) {
      smartFieldCache.setField(field, fieldQuery.data);
    }
  }, [fieldQuery.data]);

  const loading = fieldQuery.loading;

  const refetch = async () => {
    setRefetching(true);
    await Promise.all([
      fieldQuery.refetch(),
      // refetch all loaded smart values
      ...(smartValueContext ? [smartValueContext.refetch()] : [])
    ]);
    setRefetching(false);
  };

  const { mutate } = useUpdateProfile();

  const updateProfile = async (data: ProfileUpdateInput) => {
    setSaving(true);
    await mutate({ data });
    await refetch();
    setSaving(false);
  };

    return {
      refetching,
      saving,
      loading,
      value: smartFieldCache.fieldCache[field]!,
      onChange: newValue => {
        smartFieldCache.setField(field, newValue);
      },
      onBlur: possibleNewValue => {
        const value = possibleNewValue !== undefined ? possibleNewValue : smartFieldCache.fieldCache[field]!
        updateProfile(profileUpdateData(value));
      }
    };
}

export const useUpdateProfile = () => {
  const { value: saving, setTrue: setSaving, setFalse: setNotSaving } = useAtomicBoolean(
    EAtomicBoolean.False
  );
  const { value: done, setTrue: setDone } = useAtomicBoolean(EAtomicBoolean.False);
  const m = useMutation<UpdateProfile, UpdateProfileVariables>(UPDATE_PROFILE);

  const mutate = async (v: UpdateProfileVariables) => {
    setSaving();
    await m({ variables: v });
    setNotSaving();
    setDone();
  };

  return {
    mutate,
    saving: saving === EAtomicBoolean.True,
    done
  };
};
