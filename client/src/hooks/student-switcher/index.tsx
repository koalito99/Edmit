import * as React from 'react';
import { createContext, useContext } from 'react';
import { doNothingFn } from '@edmit/component-library/src/shared';
import {
  Nullable,
  StudentId,
  useNullableState
} from '@edmit/component-library/src/lib/models';

type SelectStudentIdFn = (studentId: StudentId) => void;

interface IContext {
  studentId: Nullable<StudentId>;
  selectStudentId: SelectStudentIdFn;
}

const useStudentSwitcherContext = (): IContext => {
  const [studentId, setStudentId] = useNullableState<StudentId>();

  const selectStudentId = (id: StudentId) => {
    setStudentId(id);
  };

  return {
    studentId,
    selectStudentId
  };
};

const defaultContext: IContext = {
  studentId: null,
  selectStudentId: doNothingFn
};

const Context = createContext<IContext>(defaultContext);

export const StudentSwitcherProvider: React.SFC = props => {
  const context = useStudentSwitcherContext();

  return (
    <Context.Provider value={context}>
      <>{props.children}</>
    </Context.Provider>
  );
};

export const useStudentSwitcher = () => useContext(Context);
