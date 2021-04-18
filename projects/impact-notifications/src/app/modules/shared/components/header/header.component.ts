import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  currentLanguage: string;
  constructor(private readonly translate: TranslateService) {
    this.currentLanguage = this.translate.getDefaultLang();
  }

  @Input() isOpen: boolean;
  @Output() openEvent = new EventEmitter<boolean>();

  toggle() {
    this.openEvent.emit((this.isOpen = !this.isOpen));
  }

  // in production w'll dynamic translate using end-points
  useLanguage(language: string): void {
    this.translate.use(language);
    this.currentLanguage = language;
    localStorage.setItem('language', language);
  }
}
