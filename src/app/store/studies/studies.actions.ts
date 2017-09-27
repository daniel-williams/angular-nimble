import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import * as Redux from 'redux';

import { Action, IAppState } from '../';

@Injectable()
export class StudiesActions {
  static FETCHING_STUDIES = 'FETCHING_STUDIES';
  static FETCHING_STUDIES_SUCCESS = 'FETCHING_STUDIES_SUCCESS';
  static FETCHING_STUDIES_FAILED = 'FETCHING_STUDIES_FAILED';
  
  constructor(private ngRedux: NgRedux<IAppState>) {}

  fetchStudies(): void {
    this.ngRedux.dispatch({
      type: StudiesActions.FETCHING_STUDIES
    });
  }

}
