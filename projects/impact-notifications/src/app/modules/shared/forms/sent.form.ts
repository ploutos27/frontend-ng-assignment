import { FormlyFieldConfig } from '@ngx-formly/core';

export const fields: FormlyFieldConfig[] = [
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        type: 'input',
        key: 'to',
        templateOptions: {
          label: 'Sent To',
          required: true,
        },
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'subject',
        templateOptions: {
          label: 'Subject',
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
        type: 'input',
        key: 'message',
        templateOptions: {
          label: 'Message',
          required: true,
        },
      },
    ],
  },
];
