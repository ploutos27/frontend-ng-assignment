import { ModuleWithProviders, NgModule } from '@angular/core';
import { FORMLY_CONFIG } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { registerTranslateExtension } from './translate.extension';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [TranslateModule],
  exports: [TranslateModule],
})
export class TranslationModule {
  public static forRoot(): ModuleWithProviders<TranslationModule> {
    return {
      ngModule: TranslationModule,
      providers: [
        {
          provide: FORMLY_CONFIG,
          multi: true,
          useFactory: registerTranslateExtension,
          deps: [TranslateService],
        },
      ],
    };
  }
}
