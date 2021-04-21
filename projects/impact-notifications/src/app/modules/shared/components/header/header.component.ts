import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { RemoveUserAuth } from '@impactech/common/src/lib/auth/store/auth.actions';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  currentLanguage: string;
  constructor(
    private readonly translate: TranslateService,
    private readonly store: Store
  ) {
    this.currentLanguage = this.translate.getDefaultLang();
  }

  @Input() isOpen: boolean;
  @Output() openEvent = new EventEmitter<boolean>();

  toggle() {
    this.openEvent.emit((this.isOpen = !this.isOpen));
  }

  logout() {
    this.store.dispatch(new RemoveUserAuth());
    window.location.reload();
  }


  useLanguage(language: string): void {
    this.translate.use(language);
    this.currentLanguage = language;
    localStorage.setItem('language', language);
  }
}
