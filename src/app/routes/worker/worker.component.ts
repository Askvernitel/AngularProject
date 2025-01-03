import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddScheduleDTO, ScheduleDTO } from '@app/dto';
import { WorkerService } from '@app/services';
import { SessionService } from '@app/services/session/session.service';
import { scheduleReadableStreamLike } from 'rxjs/internal/scheduled/scheduleReadableStreamLike';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {
  workerScheduleForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private workerService: WorkerService, private sessionService: SessionService) {
  }
  ngOnInit(): void {
    this.formInit();
    this.workerScheduleForm.valueChanges.subscribe(console.log);
  }

  private formInit(): void {
    this.workerScheduleForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
      shift: ['', Validators.required],
    })
  }
  private setShiftHoursDate(date: Date, shift: string, type: string): void {
    if (shift === "morning" && type === "endTime") {
      date.setHours(16);
    } else if (shift === "morning" && type === "startTime") {
      date.setHours(8);
    } else if (shift === "evening" && type === "startTime") {
      date.setHours(17);
    } else if (shift === "evening" && type == "endTime") {
      date.setHours(24);
    }

  }
  private ScheduleFormToDTO(): AddScheduleDTO {
    const scheduleForm = this.workerScheduleForm.value as Object;
    let shift = this.workerScheduleForm.value.shift;
    let startTime = this.workerScheduleForm.value.date;
    let endTime = this.workerScheduleForm.value.date;

    this.setShiftHoursDate(startTime, shift, "startTime");
    this.setShiftHoursDate(endTime, shift, "endTime");

    return new AddScheduleDTO(startTime, endTime, this.sessionService.getId());
  }


  protected handleSubmit() {
    if (this.workerScheduleForm.invalid) return;

    const scheduleRequest = this.ScheduleFormToDTO();
    this.workerService.addScheduleRequest(scheduleRequest).subscribe(console.log);

  }

}
