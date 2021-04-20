import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'auth-language-selector',
  templateUrl: './auth-language-selector.component.html',
})

export class AuthLanguageSelectorComponent {
  currentLanguage: string;
  constructor(private readonly translate: TranslateService) {
    this.currentLanguage = this.translate.getDefaultLang();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.currentLanguage = language;
    localStorage.setItem('language', language);
  }
}
