import { Component, inject } from '@angular/core';
import { AbstractDialog } from '../abstract-dialog';
import { ScheduleDialog } from '@app/routes/admin/edit-schedule/edit-schedule.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-schedule-dialog',
  templateUrl: './delete-schedule-dialog.component.html',
  styleUrl: './delete-schedule-dialog.component.css'
})
export class DeleteScheduleDialogComponent extends AbstractDialog {
  data = inject<ScheduleDialog>(MAT_DIALOG_DATA);
}
