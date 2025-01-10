import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddScheduleDTO, ScheduleDTO } from '@app/dto';
import { WorkerService } from '@app/services';
import { SessionService } from '@app/services/session/session.service';
import { SnackBar } from '@app/types';
import { SnackBarComponent } from '@app/components/snack-bars/snack-bar/snack-bar.component';
import { SnackBarService } from '@app/services/snack-bar/snack-bar.service';

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
   */
  constructor(private workerService: WorkerService, private sessionService: SessionService, private snackBar: SnackBarService) {
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
          this.snackBar.openSuccessSnackBar({ acceptText: "Ok", text: "Schedule Sent. Await For Approve", duration: 3000 });
        }
      },
      error: (error) => {
        this.snackBar.openErrorSnackBar({ acceptText: "Ok", text: "Could Not Create Request", duration: 3000 });

      }
    });
    this.resetForm();
  }
}


