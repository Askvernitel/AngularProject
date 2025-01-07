import { Component, inject } from '@angular/core';
import { AbstractDialog } from '../abstract-dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleDialog } from '@app/routes/admin/edit-schedule/edit-schedule.component';

@Component({
  selector: 'app-approve-schedule-dialog',
  templateUrl: './approve-schedule-dialog.component.html',
  styleUrl: './approve-schedule-dialog.component.css'
})
export class ApproveScheduleDialogComponent extends AbstractDialog {
  data = inject<ScheduleDialog>(MAT_DIALOG_DATA);
}
