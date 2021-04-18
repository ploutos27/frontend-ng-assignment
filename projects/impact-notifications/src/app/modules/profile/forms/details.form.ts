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
          label: 'First Name',
        },
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'lname',
        templateOptions: {
          label: 'Last Name',
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
          label: 'Email',
          required: true,
        },
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'phone',
        templateOptions: {
          label: 'Phone',
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
          label: 'Street',
        },
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'city',
        templateOptions: {
          label: 'City',
        },
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'zip',
        templateOptions: {
          type: 'number',
          label: 'Zip',
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
          label: 'Country',
        },
      },
    ],
  },
];
