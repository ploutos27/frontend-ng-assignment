import { FormlyFieldConfig } from '@ngx-formly/core';

export const fields: FormlyFieldConfig[] = [
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        type: 'input',
        key: 'fname',
        templateOptions: {
          translate: true,
          label: 'form.profile.fname',
        },
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'lname',
        templateOptions: {
          translate: true,
          label: 'form.profile.lname',
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
        key: 'email',
        templateOptions: {
          translate: true,
          label: 'form.profile.email',
          required: true,
        },
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'phone',
        templateOptions: {
          translate: true,
          label: 'form.profile.phone',
          type: 'number',
        },
      },
    ],
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-2',
        type: 'input',
        key: 'street',
        templateOptions: {
          translate: true,
          label: 'form.profile.street',
        },
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'city',
        templateOptions: {
          translate: true,
          label: 'form.profile.city',
        },
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'zip',
        templateOptions: {
          type: 'number',
          translate: true,
          label: 'form.profile.zip',
          max: 99999,
          min: 0,
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
        key: 'country',
        templateOptions: {
          type: 'text',
          translate: true,
          label: 'form.profile.country',
        },
      },
    ],
  },
];
