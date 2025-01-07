import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteUserDialog } from '@app/routes/admin/edit-user/edit-user.component';
import { AbstractDialog } from '../abstract-dialog';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.css'
})
export class DeleteUserDialogComponent extends AbstractDialog {
  readonly data = inject<DeleteUserDialog>(MAT_DIALOG_DATA);

}
