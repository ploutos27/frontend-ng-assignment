import { Component } from '@angular/core';
import { IMenuItems } from '../../interfaces/menu.interface';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-root-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  loginAs: string;
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
  constructor(private readonly service: SharedService) {
    this.service.me().subscribe((x) => (this.loginAs = x.userDetails.email));
  }
}
