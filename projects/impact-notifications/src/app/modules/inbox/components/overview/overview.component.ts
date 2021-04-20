import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SentMessageDialog } from '../../../shared/components';
import { IInbox } from '../../interfaces/inbox.interface';
import { InboxService } from '../../services/inbox.service';

@Component({
  selector: 'root-inbox-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  constructor(
    private readonly toastr: ToastrService,
    private readonly service: InboxService,
    public dialog: MatDialog,
    private readonly translate: TranslateService
  ) {}
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
    const msg: IInbox = {
      from: this.service.me().userDetails.email,
      to: x.to,
      subject: x.subject,
      message: x.message,
    };
    this.service.create(msg).subscribe(
      () => {
        this.toastr.success(
          this.translate.instant('messages.success.messageSend'),
          this.translate.instant('messages.success.title'),
          { timeOut: 4000 }
        );
      },
      () => {
        this.toastr.error(
          this.translate.instant('messages.errors.messageNotSend'),
          this.translate.instant('messages.errors.title'),
          { timeOut: 4000 }
        );
      }
    );
  }
}
