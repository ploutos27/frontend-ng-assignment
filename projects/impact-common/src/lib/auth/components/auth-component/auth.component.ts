import { Component } from '@angular/core';

@Component({
  selector: 'auth-component',
  template: `
  <div class="auth">
    <router-outlet></router-outlet>
    <auth-language-selector></auth-language-selector>
  </div>`,
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {}
