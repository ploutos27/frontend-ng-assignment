import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root-confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
  styles: ['.mat-dialog-actions {justify-content: flex-end;}'],
})
export class ConfirmationDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialog>) {}
}
