import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { LazyComponent } from './lazy.component';
import { LazyRoutingModule } from './lazy-routing.module';


@NgModule({
  imports: [
    LazyRoutingModule,
    SharedModule,
  ],
  declarations: [
    LazyComponent,
  ]
})
export class LazyModule {}
