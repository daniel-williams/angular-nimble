import { Action as ReduxAction} from 'redux';

export class Action implements ReduxAction {
  type: string;
  payload?: any;
}