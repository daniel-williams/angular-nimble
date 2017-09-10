import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { Nameplate } from './nameplate.component';
import { NameplateRoutingModule } from './nameplate-routing.module';


@NgModule({
  imports: [
    NameplateRoutingModule,
    SharedModule,
  ],
  declarations: [
    Nameplate
  ]
})
export class NameplateModule {}
