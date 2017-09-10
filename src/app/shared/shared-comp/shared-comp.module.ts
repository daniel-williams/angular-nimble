import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedCompComponent } from './shared-comp.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SharedCompComponent,
  ],
  exports: [
    SharedCompComponent
  ]
})
export class SharedCompModule {}