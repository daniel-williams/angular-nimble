import { Action } from '../Action';

import { StudiesActions as Actions } from './studies.actions';


export interface IStudiesState {
  error?: string;
  study?: string;
  studyList?: any[];
}

const initialState: IStudiesState = {
  error: null,
  study: null,
  studyList: [],
};

export function studiesReducer(state: IStudiesState = initialState, action: Action) {
  const { type, payload } = action;

  switch(type) {
    case Actions.FETCHING_STUDIES_SUCCESS: {
      return mergeState(state, { studyList: payload });
    }
    case Actions.FETCHING_STUDIES_FAILED: {
      return mergeState(state, { studyList: [], error: payload });
    }
    default: {
      return state;
    }
  }
}

const mergeState = (currentState: IStudiesState, mergeState: IStudiesState) => Object.assign({}, currentState, mergeState);