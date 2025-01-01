import { Component, OnInit } from '@angular/core';
import { ScheduleDTO } from '@app/dto';
import { AdminService, UserService, WorkerService } from '@app/services';
import { start } from 'repl';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrl: './schedule-table.component.css'
})
export class ScheduleTableComponent implements OnInit {
  data: Observable<ScheduleDTO[]>;

  columns: string[] = ["Jobs", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  dayAndMonthColumns: Date[] = [];
  ngOnInit(): void {
    //this.dateArrayInit();
  }
  constructor(private userService: UserService) {
    this.data = this.userService.getDashboard();
    let currentDate = new Date();
    this.columnsInit(currentDate);
  }
  private getNextDay(date: Date) {
    let dayInSeconds = (1000 * 60 * 60 * 24);
    return new Date(date.getTime() + dayInSeconds);
  }
  private getPrevDay(date: Date) {
    let dayInSeconds = (1000 * 60 * 60 * 24);
    return new Date(date.getTime() - dayInSeconds);
  }
  private columnsInit(currentDate: Date) {
    this.dayAndMonthColumns = []
    let startDate = currentDate;
    while (startDate.getDay() != 0) {
      startDate = this.getPrevDay(startDate);
    }
    this.dayAndMonthColumns.push(startDate);
    startDate = this.getNextDay(startDate)
    while (startDate.getDay() != 0) {
      this.dayAndMonthColumns.push(startDate);
      startDate = this.getNextDay(startDate);
    }

  }
  switchToNextWeek() {
    this.columnsInit(this.getNextDay(this.dayAndMonthColumns[6]));
  }
  switchToPreviousWeek() {
    this.columnsInit(this.getPrevDay(this.dayAndMonthColumns[0]));
  }
}
