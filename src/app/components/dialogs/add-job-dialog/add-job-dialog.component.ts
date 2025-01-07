import { Component, inject } from '@angular/core';
import { AbstractDialog } from '../abstract-dialog';
import { JobDTO } from '@app/dto';

@Component({
  selector: 'app-add-job-dialog',
  templateUrl: './add-job-dialog.component.html',
  styleUrl: './add-job-dialog.component.css'
})
export class AddJobDialogComponent extends AbstractDialog {
  returnJob: JobDTO = new JobDTO("");
}
