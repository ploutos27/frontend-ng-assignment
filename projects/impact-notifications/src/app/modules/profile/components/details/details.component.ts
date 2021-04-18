import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { fields } from '../../forms/details.form';

@Component({
  selector: 'root-profile-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model = {};
  fields = fields;
 constructor() {
  
 }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.model);
    }
  }
}
