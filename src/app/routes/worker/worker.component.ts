import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddScheduleDTO } from '@app/dto';
import { WorkerService } from '@app/services';
import { SessionService } from '@app/services/session/session.service';

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
  constructor(
    private workerService: WorkerService,
    private sessionService: SessionService,
  ) {
    this.workerScheduleForm = new FormGroup<{
      date: FormControl<Date | null>;
      shift: FormControl<shiftType | null>;
    }>({
      date: new FormControl<Date>(new Date(), Validators.required),
      shift: new FormControl<shiftType>('morning', Validators.required),
    });
  }

  /**
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
    if (shift == 'morning' && shiftType == 'endTime') {
      date.setHours(16);
    } else if (shift == 'morning' && shiftType == 'startTime') {
      date.setHours(8);
    } else if (shift == 'evening' && shiftType == 'startTime') {
      date.setHours(17);
    } else if (shift == 'evening' && shiftType == 'endTime') {
      date.setHours(24);
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

  /**
   * Handle the form submission
   * @protected
   */
  protected handleSubmit() {
    if (this.workerScheduleForm.invalid) return;
    const scheduleRequest = this.scheduleFormToDTO();
    this.workerService
      .addScheduleRequest(scheduleRequest)
      .subscribe(console.log);
  }
}
