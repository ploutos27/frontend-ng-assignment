import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SentMessageDialog } from '../../../shared/components';
import { IInbox } from '../../interfaces/inbox.interface';

@Component({
  selector: 'root-inbox-overview',
  templateUrl: './overview.component.html',
})

export class OverviewComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  compose() {
    const dialogRef = this.dialog.open(SentMessageDialog, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((x) => {
      if (x !== undefined && x !== false) this.sentMessage(x);
    });
  }

  private sentMessage(x: IInbox) {
    console.log(x)
  }
}


