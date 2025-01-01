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
  currentWeekData: ScheduleTableData[] = [];

  columns: string[] = ["Jobs", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  dayAndMonthColumns: Date[] = []; // always has length of 7

  ngOnInit(): void {
    //this.dateArrayInit();
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
  /*
    private weekDataInit() {
      this.userService.getDashboard().subscribe((data) => {
        let schedulesByDate: ScheduleDTO[][] = [];
        let currentWeek = 0;
        this.dayAndMonthColumns.forEach((date: Date) => {
          schedulesByDate.push([]);
          data.forEach((schedule: ScheduleDTO) => {
            let startTime = new Date(schedule.startTime);
            if (startTime.getMonth() == date.getMonth() && startTime.getDate() == date.getDate()) {
              schedulesByDate[currentWeek].push(schedule);
            }
          })
          currentWeek++;

        })
        this.currentWeekData = []
        this.userService.getJobs().subscribe((jobs: JobDTO[]) => {
          jobs.forEach((job: JobDTO) => {
            this.currentWeekData.push([job]);
          });
          schedulesByDate.forEach((schedules: ScheduleDTO[]) => {
            this.currentWeekData.forEach((row) => {
              let job: JobDTO = row[0];
              let currentDateSchedules: any[] = []
              schedules.forEach((schedule: ScheduleDTO) => {
                if (job.title == schedule.jobTitle) {
                  currentDateSchedules.push(schedule);
                }
              })
              row.push(currentDateSchedules);
            })
          });

          console.log(this.currentWeekData);
        })

      });
    }*/
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
  switchToNextWeek() {
    this.columnsInit(this.getNextDay(this.dayAndMonthColumns[6]));
    this.weekDataInit();
  }
  switchToPreviousWeek() {
    this.columnsInit(this.getPrevDay(this.dayAndMonthColumns[0]));
    this.weekDataInit()
  }
}
