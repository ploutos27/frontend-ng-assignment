import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationService } from './services/translation.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslationInterceptor } from './interceptors/translation.interceptor';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslationService,
      },
      useDefaultLang: false,
    })
  ],
  exports: [TranslateModule],
})
export class ClientTranslationModule {
  public static forRoot(): ModuleWithProviders<ClientTranslationModule> {
    return {
      ngModule: ClientTranslationModule,
      providers: [
        TranslationService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TranslationInterceptor,
          multi: true,
        },
      ],
    };
  }
}
