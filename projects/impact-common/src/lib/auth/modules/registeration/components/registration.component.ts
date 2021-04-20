import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { fields } from '../../../forms/auth.form';
import { ILoginRegister } from '../../../interfaces/auth.interface';
import { IResponse, Status } from '../../../interfaces/response.interface';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LoginRegisterService } from '../../../services/auth.service';

@Component({
  selector: 'auth-registration',
  templateUrl: './registration.component.html',
})

export class RegistrationComponent {
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields = fields;
  model: ILoginRegister = {
    email: null,
    password: null,
  };

  constructor(
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly registration: LoginRegisterService,
    private readonly translate: TranslateService
  ) {}

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.registration.register(this.model).subscribe((res: IResponse) => {
      if (res.status === Status.SUCCESS) {
        this.toastr.success(
          this.translate.instant('messages.success.user_register'),
          this.translate.instant('messages.success.title'),
          { timeOut: 4000 }
        );
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      } else {
        this.toastr.error(
          this.translate.instant('messages.errors.user_exist'),
          this.translate.instant('messages.errors.title'),
          { timeOut: 4000 }
        );
        this.form.reset();
      }
    });
  }
}
