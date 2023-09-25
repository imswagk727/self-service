import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-success-dialog',
  templateUrl: './upload-success-dialog.component.html',
  styleUrls: ['./upload-success-dialog.component.css']
})
export class UploadSuccessDialogComponent {
  constructor(private dialogRef: MatDialogRef<UploadSuccessDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
