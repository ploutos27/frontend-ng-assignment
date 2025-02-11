import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { createTranslateLoader, TranslationModule } from '@impactech/common/src/public-api';
// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
// Components
import { HeaderComponent, LayoutComponent, SidebarComponent,
ConfirmationDialogComponent, ViewMessageDialogComponent, SentMessageDialogComponent } from './components';
// Services
import { SharedService } from './services/shared.service';
import { SharedResolverService } from './services/shared.resolver';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    SidebarComponent,
    ConfirmationDialogComponent,
    ViewMessageDialogComponent,
    SentMessageDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    TranslationModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
  ],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [SharedService, SharedResolverService],
    };
  }
}

