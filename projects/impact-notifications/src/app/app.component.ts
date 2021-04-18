import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(translate: TranslateService) {
    const lang = localStorage.getItem('language');
    if (lang) {
      translate.setDefaultLang(lang);
    } else {
      localStorage.setItem('language', 'en');
      translate.setDefaultLang('en');

    }
  }
}
