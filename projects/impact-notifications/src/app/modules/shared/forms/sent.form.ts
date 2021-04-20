import { FormlyFieldConfig } from '@ngx-formly/core';

export const fields: FormlyFieldConfig[] = [
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
          options: [
            { label: 'Iron Man', value: 'iron_man' },
            { label: 'Captain America', value: 'captain_america' },
            { label: 'Black Widow', value: 'black_widow' },
            { label: 'Hulk', value: 'hulk' },
            { label: 'Captain Marvel', value: 'captain_marvel' },
          ],
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
