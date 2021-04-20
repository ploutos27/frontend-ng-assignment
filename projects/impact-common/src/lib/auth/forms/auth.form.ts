import { FormlyFieldConfig } from '@ngx-formly/core';

export const fields: FormlyFieldConfig[] = [
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        type: 'input',
        key: 'email',
        templateOptions: {
          translate: true,
          label: 'form.auth.email',
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
        key: 'password',
        templateOptions: {
          type: 'password',
          translate: true,
          label: 'form.auth.password',
          required: true,
        },
      },
    ],
  },
];
