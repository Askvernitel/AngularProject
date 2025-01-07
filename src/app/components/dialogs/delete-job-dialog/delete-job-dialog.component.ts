import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteJobDialog } from '@app/routes/admin/edit-job/edit-job.component';
import { AbstractDialog } from '../abstract-dialog';

@Component({
  selector: 'app-delete-job-dialog',
  templateUrl: './delete-job-dialog.component.html',
  styleUrl: './delete-job-dialog.component.css'
})
export class DeleteJobDialogComponent extends AbstractDialog {
  readonly data = inject<DeleteJobDialog>(DIALOG_DATA);
}
