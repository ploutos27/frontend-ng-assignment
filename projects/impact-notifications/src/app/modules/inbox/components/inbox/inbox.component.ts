import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { IInbox } from '../../interfaces/inbox.interface';
import { ConfirmationDialog, ViewMessageDialog } from '../../../shared/components';
import { ActivatedRoute } from '@angular/router';

const ELEMENT_DATA: IInbox[] = [{
  from: 'Ploutarchos',
  to: 'Andreas',
  subject: 'Welcome message',
  message: 'Hi there'
}];

@Component({
  selector: 'root-inbox-inbox',
  templateUrl: './inbox.component.html',
})
export class InboxComponent implements AfterViewInit {
  get data() {
    return this.route.snapshot.data;
  }
  constructor(
    private readonly route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  displayedColumns: string[] = ['from', 'subject', 'date', 'star'];
  dataSource = new MatTableDataSource<IInbox>(this.data.inbox);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewMessage(element: IInbox) {
    const dialogRef = this.dialog.open(ViewMessageDialog, {
      width: '600px',
      data: element,
    });
    dialogRef.afterClosed().subscribe((x) => {
      if (x !== undefined && x === true) this.markAsRead(element);
    });
  }

  confirmDelete(element: IInbox) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((x) => {
      if (x !== undefined && x === true) this.messageDeletion(element);
    });
  }

  private messageDeletion(messageToDelete: IInbox) {}

  private markAsRead(element: IInbox) {}
}



