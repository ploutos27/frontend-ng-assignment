import { FormlyFieldConfig } from '@ngx-formly/core';

export const fields: FormlyFieldConfig[] = [
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        type: 'input',
        key: 'currentPassword',
        templateOptions: {
          type: 'password',
          translate: true,
          label: 'form.security.currentPassword',
          required: true,
        },
      },
    ],
  },
  {
    validators: {
      validation: [
        { name: 'fieldMatch', options: { errorPath: 'passwordConfirm' } },
      ],
    },
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        type: 'input',
        key: 'password',
        templateOptions: {
          type: 'password',
          translate: true,
          label: 'form.security.newPassword',
          required: true,
        },
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'passwordConfirm',
        templateOptions: {
          type: 'password',
          translate: true,
          label: 'form.security.confirmPassword',
          required: true,
        },
      },
    ],
  },
];
