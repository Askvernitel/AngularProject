import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackBarComponent } from '@app/components/snack-bars/success-snack-bar/success-snack-bar.component';
import { AddScheduleDTO, ScheduleDTO } from '@app/dto';
import { WorkerService } from '@app/services';
import { SessionService } from '@app/services/session/session.service';
import { SnackBar } from '@app/types';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {
  workerScheduleForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private workerService: WorkerService, private sessionService: SessionService, private snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.workerScheduleForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
      shift: ['', Validators.required],
    })
  }
  private setShiftHoursDate(date: Date, shift: string, type: string): void {
    date.setMinutes(0);
    date.setSeconds(0);
    if (shift == "morning" && type == "endTime") {
      date.setHours(16);
    } else if (shift == "morning" && type == "startTime") {
      date.setHours(8);
    } else if (shift == "evening" && type == "startTime") {
      date.setHours(17);
    } else if (shift == "evening" && type == "endTime") {
      date.setHours(23);
    }

  }
  private scheduleFormToDTO(): AddScheduleDTO {
    let shift = this.workerScheduleForm.value.shift;
    let startTime = new Date(this.workerScheduleForm.value.date);
    let endTime = new Date(this.workerScheduleForm.value.date);

    this.setShiftHoursDate(startTime, shift, "startTime");
    this.setShiftHoursDate(endTime, shift, "endTime");
    return new AddScheduleDTO(startTime, endTime, this.sessionService.id);
  }
  private openSuccessSnackBar(snackBarData: SnackBar) {

    this.snackBar.openFromComponent(SuccessSnackBarComponent, {
      duration: 3000,
      data: snackBarData,
      panelClass: ["success-snackbar"],
    })
  }
  private openErrorSnackBar(snackBarData: SnackBar) {
    this.snackBar.openFromComponent(SuccessSnackBarComponent, {
      duration: 3000,
      data: snackBarData,
      panelClass: ["error-snackbar"],
    })
  }
  private resetForm() {
    this.workerScheduleForm.get('shift')?.reset();
  }

  protected handleSubmit() {
    if (this.workerScheduleForm.invalid) return;
    const scheduleRequest = this.scheduleFormToDTO();
    this.workerService.addScheduleRequest(scheduleRequest).subscribe({
      next: (requested) => {
        if (requested) {
          this.openSuccessSnackBar({ acceptText: "Ok", text: "Schedule Sent. Await For Approve" });
        }
      },
      error: (error) => {
        this.openErrorSnackBar({ acceptText: "Ok", text: "Could Not Create Request" });

      }
    });
    this.resetForm();
  }

}
