import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../../shared/interfaces/user.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'root-dashboard-frequent-users',
  templateUrl: './frequent-users.component.html',
})

export class FrequentUsersComponent implements OnInit {
  @Input() user: IUser;

  displayedColumns: string[] = ['user', 'send', 'received'];
  dataSource$: Observable<any>;
  
  constructor(private readonly service: DashboardService) {}

  ngOnInit(): void {
   this.dataSource$ = this.service.mostFrequestUsers(this.user.userDetails.email);
  }
}
