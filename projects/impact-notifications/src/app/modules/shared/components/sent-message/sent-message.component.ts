import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormlyFormOptions } from '@ngx-formly/core';
import { fields } from '../../forms/sent.form';

@Component({
  selector: 'app-root-sent-message',
  templateUrl: './sent-message.component.html',
  styles: ['.mat-dialog-actions {justify-content: flex-end;}'],
})

export class SentMessageDialog {
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model = {};
  fields = fields;
  constructor(public dialogRef: MatDialogRef<SentMessageDialog>) {}
}
