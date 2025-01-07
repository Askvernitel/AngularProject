import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApproveScheduleDialogComponent } from '@app/components/dialogs/approve-schedule-dialog/approve-schedule-dialog.component';
import { DeleteScheduleDialogComponent } from '@app/components/dialogs/delete-schedule-dialog/delete-schedule-dialog.component';
import { ScheduleDTO } from '@app/dto';
import { AdminService, UserService } from '@app/services';
import { Observable } from 'rxjs';


export type ScheduleDialog = {
  schedule: ScheduleDTO
}

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrl: './edit-schedule.component.css'
})
export class EditScheduleComponent implements OnInit {
  schedules$!: Observable<ScheduleDTO[]>
  columns: string[] = ["Id", "Start Time", "End Time", "User Id", "First Name", "Last Name", "Job Id", "Job Title", "Status", "operations"];

  constructor(private userService: UserService, private adminService: AdminService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.update();
  }

  update() {

    this.schedules$ = this.userService.getDashboard();
  }

  handleApproveSchedule(schedule: ScheduleDTO) {
    const dialogRef = this.dialog.open(ApproveScheduleDialogComponent, { data: { schedule: schedule } });

    dialogRef.afterClosed().subscribe((schedule: ScheduleDTO) => {
      if (schedule !== undefined) {
        this.adminService.approveScheduleRequest(schedule.id).subscribe((approved) => {
          console.log(approved);
          if (approved) this.update();
        });
      }
    });
  }

  handleDeleteSchedule(schedule: ScheduleDTO) {
    const dialogRef = this.dialog.open(DeleteScheduleDialogComponent, { data: { schedule: schedule } });

    dialogRef.afterClosed().subscribe((schedule: ScheduleDTO) => {

      if (schedule !== undefined) {
        this.adminService.deleteScheduleById(schedule.id).subscribe((deleted) => {
          if (deleted) this.update();
        });
      }
    });
  }

}
