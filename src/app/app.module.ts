import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';

import { App } from './app.component';
import { SiteNav } from './site-nav';


@NgModule({
  bootstrap: [App],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,

    AppRoutingModule,
    CoreModule,
  ],
  declarations: [
    App,
    SiteNav,
  ],
  providers: []
})
export class AppModule { }
