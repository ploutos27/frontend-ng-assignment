import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { TranslateModule } from '@ngx-translate/core';
import { RegistrationComponent } from './components/registration.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslationModule } from '@impactech/common/src/public-api';
import { ToastrModule } from 'ngx-toastr';
import { LoginRegisterService } from '../../services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  },
];

@NgModule({
  declarations: [RegistrationComponent],
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
export class RegistrationModule {}
