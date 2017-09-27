import { routerReducer } from '@angular-redux/router';

import { Action } from './Action';
import { IStudiesState, studiesReducer } from './studies';


export interface IAppState {
  router?: any;
  studies?: IStudiesState;
};

export const rootReducer = (state: IAppState = {}, action: Action): IAppState => {
  return Object.assign({}, state, {
    router: routerReducer(state.router, action as any),
    studies: studiesReducer(state.studies, action),
  });
}
