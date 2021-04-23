import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent, ViewMessageDialogComponent } from '../../../shared/components';
import { IUser } from '../../../shared/interfaces/user.interface';
import { IInbox } from '../../interfaces/inbox.interface';
import { InboxService } from '../../services/inbox.service';

@Component({
  selector: 'app-root-inbox-outbox',
  templateUrl: './outbox.component.html',
})
export class OutboxComponent implements OnInit {
  get user(): IUser {
    return this.route.snapshot.data.user;
  }

  displayedColumns: string[] = ['to', 'subject', 'date', 'star'];
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
    this.dataSource$ = this.service.read(this.user.userDetails.email, 'outbox');
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
    this.service.delete(messageToDelete, this.user.userDetails.email, 'outbox').subscribe(
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