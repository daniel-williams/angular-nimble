import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedService } from './shared.service';
import { SharedCompModule } from './shared-comp';

@NgModule({
  imports: [
    CommonModule,

    SharedCompModule,
  ],
  exports: [
    CommonModule,
    FormsModule,

    SharedCompModule,
  ],
  providers: [
    SharedService,
  ]
})
export class SharedModule {}