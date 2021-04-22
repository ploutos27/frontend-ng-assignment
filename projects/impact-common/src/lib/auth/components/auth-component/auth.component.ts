import { Component } from '@angular/core';

@Component({
  selector: 'imp-auth-component',
  template: ` <div class="auth">
    <router-outlet></router-outlet>
    <imp-auth-language-selector></imp-auth-language-selector>
  </div>`,
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {}
