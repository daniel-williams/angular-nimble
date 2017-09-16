import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
  <site-nav></site-nav>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class App {}
