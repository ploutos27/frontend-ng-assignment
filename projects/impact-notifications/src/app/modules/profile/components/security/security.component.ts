import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RemoveUserAuth } from '@impactech/common/src/lib/auth/store/auth.actions';
import { FormlyFormOptions } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { fields } from '../../forms/security.form';
import { IPassword } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'root-profile-security',
  templateUrl: './security.component.html',
})
export class SecurityComponent {
  get data() {
    return this.route.snapshot.data.user;
  }

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: IPassword = {
    currentPassword: null,
    password: null,
    passwordConfirm: null,
  };
  fields = fields;

  constructor(
    private readonly profile: ProfileService,
    private readonly route: ActivatedRoute,
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
    private store: Store
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.profile
        .changedPasswrd(this.model, this.data.userDetails.email)
        .subscribe(
          () => {
            this.toastr.success(
              this.translate.instant('messages.success.userPwdChange'),
              this.translate.instant('messages.success.title'),
              { timeOut: 4000 }
            );
            this.store.dispatch(new RemoveUserAuth());
             window.location.reload();
          },
          () => {
            this.toastr.error(
              this.translate.instant('messages.errors.userPwdNotChange'),
              this.translate.instant('messages.errors.title'),
              { timeOut: 4000 }
            );
          }
        );
    }
  }
}
