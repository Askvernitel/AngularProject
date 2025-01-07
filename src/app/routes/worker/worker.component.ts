import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddScheduleDTO, ScheduleDTO } from '@app/dto';
import { WorkerService } from '@app/services';
import { SessionService } from '@app/services/session/session.service';

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
  }

  private formInit(): void {
    this.workerScheduleForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
      shift: ['', Validators.required],
    })
  }
  private setShiftHoursDate(date: Date, shift: string, type: string): void {
    if (shift == "morning" && type == "endTime") {
      date.setHours(16);
    } else if (shift == "morning" && type == "startTime") {
      date.setHours(8);
    } else if (shift == "evening" && type == "startTime") {
      date.setHours(17);
    } else if (shift == "evening" && type == "endTime") {
      date.setHours(24);
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


  protected handleSubmit() {
    if (this.workerScheduleForm.invalid) return;
    const scheduleRequest = this.scheduleFormToDTO();
    this.workerService.addScheduleRequest(scheduleRequest).subscribe(console.log);

  }

}
