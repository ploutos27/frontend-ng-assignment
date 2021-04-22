import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { fields } from '../../../forms/auth.form';
import { ILoginRegister, IUser } from '../../../interfaces/auth.interface';
import { SetUserAuth } from '../../../store/auth.actions';
import { LoginRegisterService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'imp-auth-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields = fields;
  model: ILoginRegister = {
    email: null,
    password: null,
  };

  constructor(
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly login: LoginRegisterService,
    private readonly store: Store,
    private readonly translate: TranslateService
  ) {}

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.login
      .login(this.model)
      .pipe(first())
      .subscribe((data: IUser) => {
        if (data.authenticated) {
          this.store.dispatch(new SetUserAuth(data));
          this.router.navigate([this.route.snapshot.queryParams.rurl || '/']);
        } else {
          this.toastr.error(
            this.translate.instant('messages.errors.login'),
            this.translate.instant('messages.errors.title'),
            { timeOut: 4000 }
          );
        }
      });
  }
}
