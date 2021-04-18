import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CurrentLanguageLocalStorageKey, DefaultFallbackLanguageId } from '../const';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService) {}

  getCurrentLanguage() {
    return (
      localStorage.getItem(CurrentLanguageLocalStorageKey) ||
      DefaultFallbackLanguageId
    );
  }

  switchToLanguage(languageId: string) {
    this.translate.use(languageId);
  }
}
