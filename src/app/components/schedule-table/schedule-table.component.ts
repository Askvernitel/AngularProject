import { Component, OnInit } from '@angular/core';
import { JobDTO, ScheduleDTO, UserDTO } from '@app/dto';
import { AdminService, UserService, WorkerService } from '@app/services';
import { start } from 'repl';
import { Observable } from 'rxjs';

type ScheduleTableData = {
  Jobs?: string,
  Sunday?: ScheduleDTO[],
  Monday?: ScheduleDTO[],
  Tuesday?: ScheduleDTO[],
  Wednesday?: ScheduleDTO[],
  Thursday?: ScheduleDTO[],
  Friday?: ScheduleDTO[],
  Saturday?: ScheduleDTO[],
}

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrl: './schedule-table.component.css'
})
export class ScheduleTableComponent implements OnInit {
  data!: ScheduleDTO[];
  currentWeekData: any[] = [];
  columns: string[] = ["Jobs", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  dayAndMonthColumns: Date[] = []; // always has length of 7


  ngOnInit(): void {
  }
  constructor(private userService: UserService) {
    let currentDate = new Date();
    this.columnsInit(currentDate);
    this.weekDataInit();
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
  private weekDataInit() {
    this.userService.getDashboard().subscribe((data) => {
      const schedulesByDate: ScheduleDTO[][] = [];
      let currentWeek = 0;

      this.dayAndMonthColumns.forEach((date: Date) => {
        schedulesByDate.push([]);
        data.forEach((schedule: ScheduleDTO) => {
          const startTime = new Date(schedule.startTime);
          if (
            startTime.getMonth() === date.getMonth() &&
            startTime.getDate() === date.getDate()
          ) {
            schedulesByDate[currentWeek].push(schedule);
          }
        });
        currentWeek++;
      });

      this.currentWeekData = [];
      this.userService.getJobs().subscribe((jobs: JobDTO[]) => {
        jobs.forEach((job: JobDTO) => {
          const row: any = { Jobs: job.title };
          schedulesByDate.forEach((schedules, index) => {
            const daySchedules = schedules.filter(
              (schedule) => schedule.jobTitle === job.title
            );
            row[this.columns[index + 1]] = daySchedules;
          });
          this.currentWeekData.push(row);
        });

        console.log(this.currentWeekData);
      });
    });
  }
  protected switchToNextWeek() {
    this.columnsInit(this.getNextDay(this.dayAndMonthColumns[6]));
    this.weekDataInit();
  }
  protected switchToPreviousWeek() {
    this.columnsInit(this.getPrevDay(this.dayAndMonthColumns[0]));
    this.weekDataInit()
  }
  protected isMorningShift(stringDate: string): boolean {
    let date = new Date(stringDate);
    let morningShiftLowerBound = 8;//8am
    let morningShiftUpperBound = 16; //4pm
    return date.getHours() >= morningShiftLowerBound && date.getHours() <= morningShiftUpperBound;
  }
}
