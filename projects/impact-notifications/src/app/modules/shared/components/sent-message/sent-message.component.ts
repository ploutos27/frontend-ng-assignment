import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormlyFormOptions } from '@ngx-formly/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IInbox } from '../../../inbox/interfaces/inbox.interface';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-root-sent-message-dialog',
  templateUrl: './sent-message.component.html',
  styles: ['.mat-dialog-actions {justify-content: flex-end;}'],
})
export class SentMessageDialogComponent {
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: IInbox = {
    from: null,
    to: null,
    subject: null,
    message: null,
  };
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'select',
          key: 'to',
          templateOptions: {
            translate: true,
            label: 'form.inbox.sendTo',
            required: true,
            options: this.shared.getUsers(),
            valueProp: 'value',
            labelProp: 'name',
          },
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'subject',
          templateOptions: {
            translate: true,
            label: 'form.inbox.subject',
            required: true,
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'textarea',
          key: 'message',
          templateOptions: {
            translate: true,
            label: 'form.inbox.message',
            rows: 5,
            required: true,
          },
        },
      ],
    },
  ];

  constructor(
    private shared: SharedService,
    public dialogRef: MatDialogRef<SentMessageDialogComponent>
  ) {}
}
