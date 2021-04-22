import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { ApiTokenService } from './services/api-token.service';
import { AuthComponent } from './components/auth-component/auth.component';
import { AuthLanguageSelectorComponent } from './components/auth-language-selector/language-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/auth.state';
import { NotAuthGuard } from './guards/not-auth.guard';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./modules/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'registration',
        loadChildren: () =>
          import('./modules/registeration/registration.module').then(
            (m) => m.RegistrationModule
          ),
      },
    ],
    canActivate: [NotAuthGuard],
  },
];

@NgModule({
  declarations: [AuthComponent, AuthLanguageSelectorComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),
    NgxsModule.forFeature([AuthState]),
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [...httpInterceptorProviders, ApiTokenService, AuthGuard],
    };
  }
}

