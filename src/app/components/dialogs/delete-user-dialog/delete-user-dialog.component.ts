import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteUserDialog } from '@app/routes/admin/edit-user/edit-user.component';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.css'
})
export class DeleteUserDialogComponent {
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject<DeleteUserDialog>(MAT_DIALOG_DATA);
  protected handleNoClick() {
    this.dialogRef.close();
  }
}
