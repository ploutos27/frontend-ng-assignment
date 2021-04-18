import { Component } from '@angular/core';
import { IMenuItems } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-root-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent {
  menu: IMenuItems[] = [
    {
      label: 'dashboard',
      router: '/dashboard',
    },
    {
      label: 'inbox',
      router: '/inbox',
    },
    {
      label: 'profile',
      router: '/profile',
    },
  ];
}
