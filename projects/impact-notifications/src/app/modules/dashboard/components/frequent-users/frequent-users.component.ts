import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'root-dashboard-frequent-users',
  templateUrl: './frequent-users.component.html',
})
export class FrequentUsersComponent implements OnInit {
  @Input() user: IUser;
  
  ngOnInit(): void {
    console.log('hi');
  }
}
