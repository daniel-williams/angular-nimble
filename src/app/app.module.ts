import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { createStore, applyMiddleware, Store } from 'redux'
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter  } from '@angular-redux/router';
import { createLogger } from 'redux-logger';

import { default as createSagaMiddleware } from 'redux-saga';
import { studySagas } from './sagas';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';

import { App } from './app.component';
import { AppConstants } from './app.constants';
import { SiteNav } from './site-nav';
import { IAppState, rootReducer, StudiesActions } from './store';


@NgModule({
  bootstrap: [App],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    NgReduxModule,
    NgReduxRouterModule,
    ReactiveFormsModule,

    AppRoutingModule,
    CoreModule,
  ],
  declarations: [
    App,
    SiteNav,
  ],
  providers: [
    AppConstants,
    StudiesActions,
  ]
})
export class AppModule {
    constructor(
      private appConstants: AppConstants,
      private ngRedux: NgRedux<IAppState>,
      private ngReduxRouter: NgReduxRouter) {

      const sagaMiddleware = createSagaMiddleware();
      const loggerMiddleware = appConstants.logRouteChanges ? [createLogger()] : [];
      const store: Store<IAppState> = createStore(
        rootReducer,
        {},
        applyMiddleware(...[sagaMiddleware, ...loggerMiddleware])
      )

      this.ngRedux.provideStore(store);

      this.ngReduxRouter.initialize();
      sagaMiddleware.run(studySagas);
    }
}
