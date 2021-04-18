import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { fields } from '../../forms/security.form';

@Component({
  selector: 'root-profile-security',
  templateUrl: './security.component.html',
})

export class SecurityComponent {
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model = {};
  fields = fields;

  onSubmit() {
    if (this.form.valid) {
      console.log(this.model);
    }
  }
}