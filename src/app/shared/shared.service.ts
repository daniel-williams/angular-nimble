import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SharedService {
  count$: BehaviorSubject<number>;

  constructor() {
    this.count$ = new BehaviorSubject(0);
    this.startCounter();
  }

  get count(): Observable<number> {
    return this.count$;
  }

  private startCounter() {
    let count = 0;

    setInterval(() => this.count$.next(++count), 1000);
  }
}