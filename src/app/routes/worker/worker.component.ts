import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackBarComponent } from '@app/components/snack-bars/success-snack-bar/success-snack-bar.component';
import { AddScheduleDTO, ScheduleDTO } from '@app/dto';
import { WorkerService } from '@app/services';
import { SessionService } from '@app/services/session/session.service';
import { SnackBar } from '@app/types';

const $shifts = [
  { value: 'morning', label: 'Morning' },
  { value: 'evening', label: 'Evening' },
] as const;
type shiftType = (typeof $shifts)[number]['value'];

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css'],
})
export class WorkerComponent {
  workerScheduleForm: FormGroup<{
    date: FormControl<Date | null>;
    shift: FormControl<shiftType | null>;
  }>;
  shifts = $shifts;

  /**
   * Constructor
   * @param workerService Worker service
   * @param sessionService Session service
   * @param snackBar MatSnackBar
   */
  constructor(private workerService: WorkerService, private sessionService: SessionService, private snackBar: MatSnackBar) {
    this.workerScheduleForm = new FormGroup<{
      date: FormControl<Date | null>;
      shift: FormControl<shiftType | null>;
    }>({
      date: new FormControl<Date>(new Date(), Validators.required),
      shift: new FormControl<shiftType>('morning', Validators.required),
    });
  }

  ngOnInit(): void {
  }
  /*
  *
  * Set the hours of the date object based on the shift and shift type
  * @param date Date object
  * @param shift Shift type
  * @param shiftType Shift time type
  * @private
  */
  private setShiftHoursDate(
    date: Date,
    shift: 'morning' | 'evening',
    shiftType: 'startTime' | 'endTime',
  ): void {
    date.setMinutes(0);
    date.setSeconds(0);
    if (shift == "morning" && shiftType == "endTime") {
      date.setHours(16);
    } else if (shift == 'morning' && shiftType == 'startTime') {
      date.setHours(8);
    } else if (shift == 'evening' && shiftType == 'startTime') {
      date.setHours(17);
    } else if (shift == "evening" && shiftType == "endTime") {
      date.setHours(23);
    }
  }

  /**
   * Convert the form to a DTO object
   * @private
   */
  private scheduleFormToDTO(): AddScheduleDTO {
    let shift = this.workerScheduleForm.value.shift ?? 'morning';
    let startTime = new Date(this.workerScheduleForm.value.date ?? new Date());
    let endTime = new Date(this.workerScheduleForm.value.date ?? new Date());

    this.setShiftHoursDate(startTime, shift, 'startTime');
    this.setShiftHoursDate(endTime, shift, 'endTime');
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

  /**
   * Handle the form submission
   * @protected
   */
  protected handleSubmit() {
    if (this.workerScheduleForm.invalid) return;
    const scheduleRequest = this.scheduleFormToDTO();
    console.log(scheduleRequest);
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


