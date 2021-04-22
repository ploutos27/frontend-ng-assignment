import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IInbox } from '../../../inbox/interfaces/inbox.interface';

@Component({
  selector: 'app-root-view-message-dialog',
  templateUrl: './view-message.component.html',
  styles: ['.mat-dialog-actions {justify-content: flex-end;}'],
})
export class ViewMessageDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IInbox,
    public dialogRef: MatDialogRef<ViewMessageDialogComponent>
  ) {}
}
