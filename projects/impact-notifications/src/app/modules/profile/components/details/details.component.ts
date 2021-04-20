import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { fields } from '../../forms/details.form';
import { IProfile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'root-profile-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  get data() {
    return this.route.snapshot.data.user;
  }

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: IProfile = {
    fname: this.data.userDetails.fname || null,
    lname: this.data.userDetails.lname || null,
    email: this.data.userDetails.email || null,
    phone: this.data.userDetails.phone || null,
    street: this.data.userDetails.street || null,
    city: this.data.userDetails.city || null,
    zip: this.data.userDetails.zip || null,
    country: this.data.userDetails.country || null,
  };
  fields = fields;

  constructor(
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
    private readonly profile: ProfileService,
    private readonly route: ActivatedRoute
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.profile.update(this.model, this.data.userDetails.email).subscribe(
        () => {
          this.toastr.success(
            this.translate.instant('messages.success.userUpdated'),
            this.translate.instant('messages.success.title'),
            { timeOut: 4000 }
          );
        },
        () => {
          this.toastr.error(
            this.translate.instant('messages.errors.userNotUpdated'),
            this.translate.instant('messages.errors.title'),
            { timeOut: 4000 }
          );
        }
      );
    }
  }
}
