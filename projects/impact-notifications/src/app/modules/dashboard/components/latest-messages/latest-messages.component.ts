import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IInbox } from '../../../inbox/interfaces/inbox.interface';
import { ViewMessageDialogComponent } from '../../../shared/components';
import { IUser } from '../../../shared/interfaces/user.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-root-dashboard-latest-messages',
  templateUrl: './latest-messages.component.html',
})
export class LatestMessagesComponent implements OnInit {
  @Input() user: IUser;
  displayedColumns: string[] = ['from', 'subject', 'date', 'star'];
  dataSource$: Observable<any>;


  constructor(
    public dialog: MatDialog,
    private readonly services: DashboardService
  ) {}

  ngOnInit(): void {
    this.dataSource$ = this.services.latestMessages(
      this.user.userDetails.email,
      '10'
    );
  }

  viewMessage(element: IInbox) {
    const dialogRef = this.dialog.open(ViewMessageDialogComponent, {
      width: '600px',
      data: element,
    });
  }
}
