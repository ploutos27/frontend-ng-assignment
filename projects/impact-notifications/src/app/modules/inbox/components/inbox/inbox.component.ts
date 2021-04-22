import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IInbox } from '../../interfaces/inbox.interface';
import {
  ConfirmationDialogComponent,
  ViewMessageDialogComponent,
} from '../../../shared/components';
import { ActivatedRoute } from '@angular/router';
import { InboxService } from '../../services/inbox.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-root-inbox-inbox',
  templateUrl: './inbox.component.html',
})
export class InboxComponent implements OnInit {
  get user(): IUser {
    return this.route.snapshot.data.user;
  }
  displayedColumns: string[] = ['from', 'subject', 'date', 'star'];
  dataSource$: Observable<IInbox[]>;
  constructor(
    private readonly route: ActivatedRoute,
    public dialog: MatDialog,
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
    private readonly service: InboxService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.dataSource$ = this.service.inbox(this.user.userDetails.email);
  }

  viewMessage(element: IInbox) {
    const dialogRef = this.dialog.open(ViewMessageDialogComponent, {
      width: '600px',
      data: element,
    });
  }

  confirmDelete(element: IInbox) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((x) => {
      if (x !== undefined && x === true) {
        this.messageDeletion(element);
      }
    });
  }

  private messageDeletion(messageToDelete: IInbox) {
    this.service.delete(messageToDelete, this.user.userDetails.email).subscribe(
      () => {
        this.toastr.success(
          this.translate.instant('messages.success.messageDelete'),
          this.translate.instant('messages.success.title'),
          { timeOut: 4000 }
        );
        this.refresh();
      },
      () => {
        this.toastr.error(
          this.translate.instant('messages.errors.messageNotDelete'),
          this.translate.instant('messages.errors.title'),
          { timeOut: 4000 }
        );
      }
    );
  }
}
