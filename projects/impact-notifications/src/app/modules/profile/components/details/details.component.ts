import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../../shared/interfaces/user.interface';
import { fields } from '../../forms/details.form';
import { IProfile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'root-profile-details',
  templateUrl: './details.component.html',
})

export class DetailsComponent implements OnInit {
  @Input() user: IUser;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: IProfile;
  fields = fields;

  constructor(
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
    private readonly profile: ProfileService
  ) {}
  
  ngOnInit(): void {
    this.model = {
      fname: this.user.userDetails.fname || null,
      lname: this.user.userDetails.lname || null,
      email: this.user.userDetails.email || null,
      phone: this.user.userDetails.phone || null,
      street: this.user.userDetails.street || null,
      city: this.user.userDetails.city || null,
      zip: this.user.userDetails.zip || null,
      country: this.user.userDetails.country || null,
    };
  }

  onSubmit() {
    if (this.form.valid) {
      this.profile.update(this.model, this.user.userDetails.email).subscribe(
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
