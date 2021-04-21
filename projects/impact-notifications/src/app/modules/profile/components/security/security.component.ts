import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RemoveUserAuth } from '@impactech/common/src/lib/auth/store/auth.actions';
import { FormlyFormOptions } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../../shared/interfaces/user.interface';
import { fields } from '../../forms/security.form';
import { IPassword } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'root-profile-security',
  templateUrl: './security.component.html',
})

export class SecurityComponent implements OnInit {
  @Input() user: IUser;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: IPassword;
  fields = fields;

  constructor(
    private readonly profile: ProfileService,
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
   this.model = {
     currentPassword: null,
     password: null,
     passwordConfirm: null
   };
  }

  onSubmit() {
    if (this.form.valid) {
      this.profile
        .changedPasswrd(this.model, this.user.userDetails.email)
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
