import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';
import { LoginComponent } from './components/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginRegisterService } from '../../services/auth.service';
import { TranslationModule } from '@impactech/common/src/public-api';

const routes: Routes = [{
    path: '',
    component: LoginComponent,
  }];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    TranslationModule,
    TranslateModule,
    ToastrModule.forRoot(),
  ],
  providers: [LoginRegisterService],
})
export class LoginModule {}
