import { NgModule } from '@angular/core';
import { FORMLY_CONFIG } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { registerTranslateExtension } from './translate.extension';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [TranslateModule],
  providers: [
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: registerTranslateExtension,
      deps: [TranslateService],
    },
  ],
  exports: [TranslateModule],
})

export class TranslationModule {}

