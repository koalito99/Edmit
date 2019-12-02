import { ActionsUnion, createAction } from '../lib/redux';

export enum ActionTypes {
  LOG_OUT = 'LOG_OUT',
  QUERY_STARTED = '@@graphql/QUERY_STARTED',
  QUERY_RESULT_RECEIVED = '@@graphql/QUERY_RESULT_RECEIVED',
  QUERY_ERROR = '@@graphql/QUERY_ERROR',
  MUTATION_STARTED = '@@graphql/MUTATION_STARTED',
  MUTATION_RESULT_RECEIVED = '@@graphql/MUTATION_RESULT_RECEIVED',
  MUTATION_ERROR = '@@graphql/MUTATION_ERROR',
  SWITCH_STUDENT = 'SWITCH_STUDENT'
}

const actions = {
  logout: () => createAction(ActionTypes.LOG_OUT),
  mutationError: (result: {
    name?: string;
    error: { name: string; message: string; stack?: string };
  }) => createAction(ActionTypes.MUTATION_ERROR, result, false),
  mutationResultReceived: (result: { name?: string; response: any }) =>
    createAction(ActionTypes.MUTATION_RESULT_RECEIVED, result, false),
  mutationStarted: (operation: { name?: string; mutation: string; variables?: any }) =>
    createAction(ActionTypes.MUTATION_STARTED, operation, op => {
      const { password, ...restVars } = op.variables; // exclude password from analytics
      return {
        mutation: op.mutation,
        name: op.mutation,
        variables: {
          password: password ? 'REDACTED' : undefined,
          ...restVars
        }
      };
    }),
  queryError: (result: {
    name?: string;
    error: { name: string; message: string; stack?: string };
  }) => createAction(ActionTypes.QUERY_ERROR, result, false),
  queryResultReceived: (result: { name?: string; response: any }) =>
    createAction(ActionTypes.QUERY_RESULT_RECEIVED, result, false),
  queryStarted: (operation: { name?: string; query: string; variables?: any }) =>
    createAction(ActionTypes.QUERY_STARTED, operation, false)
};

export type Actions = ActionsUnion<typeof actions>;

export default actions;
