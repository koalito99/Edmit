import { IProfilePageState, profilePageReducerKey } from './reducer';
import { IState } from '../../../store/rootReducer';
import { IProfilePageWithDataViewModel } from '.';

const profilePageState = (state: IState): IProfilePageState => state[profilePageReducerKey];

export const profilePageViewModel = (state: IState): IProfilePageWithDataViewModel => {
  return {
    searchHighSchoolQuery: profilePageState(state).searchHighSchoolQuery,
    searchZipCodeQuery: profilePageState(state).searchZipCodeQuery,
    selectedHighSchool: profilePageState(state).selectedHighSchool,
    selectedZipCode: profilePageState(state).selectedZipCode
  };
};
