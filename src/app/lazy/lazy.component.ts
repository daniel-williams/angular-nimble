import { Component } from '@angular/core';

import { CoreService } from '../core';
import { SharedService } from '../shared';

@Component({
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss'],
  host: {
    class: 'card',
  }
})
export class LazyComponent {

  coreCount: number;
  sharedCount: number;

  constructor(private cs: CoreService, private vs: SharedService) {
    cs.count.subscribe(x => this.coreCount = x);
    vs.count.subscribe(x => this.sharedCount = x);
  }
}
