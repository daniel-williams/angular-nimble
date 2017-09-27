import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IAppState, IStudiesState, StudiesActions } from '../store';

@Component({
  templateUrl: './nameplate.component.html',
  styleUrls: ['./nameplate.component.scss'],
})
export class Nameplate {
  @select(['studies']) studies$: Observable<any>;

  studiesState: IStudiesState;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.studies$.subscribe(x => this.studiesState = x);
  }

  doFetch(evt: any) {
    this.ngRedux.dispatch({ type: StudiesActions.FETCHING_STUDIES });
  }
}
