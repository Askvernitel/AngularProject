import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddJobDialogComponent } from '@app/components/dialogs/add-job-dialog/add-job-dialog.component';
import { DeleteJobDialogComponent } from '@app/components/dialogs/delete-job-dialog/delete-job-dialog.component';
import { GetJobDTO, JobDTO } from '@app/dto';
import { AdminService, UserService } from '@app/services';
import { Observable } from 'rxjs';
import { EventEmitter } from 'stream';


export type DeleteJobDialog = {
  job: GetJobDTO,
}

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.css'
})
export class EditJobComponent implements OnInit {
  jobs$!: Observable<GetJobDTO[]>;
  columns: string[] = ["Job Id", "Job Title", "Operations"];
  ngOnInit(): void {
    this.update();
  }

  private fetchJobs() {
    this.jobs$ = this.userService.getJobs();
  }

  constructor(private adminService: AdminService, private userService: UserService, private dialog: MatDialog) {

  }
  private update() {
    this.fetchJobs();
  }

  protected handleDeleteJob(job: GetJobDTO) {
    const dialogRef = this.dialog.open(DeleteJobDialogComponent, { data: { job: job } });

    dialogRef.afterClosed().subscribe((jobId: number) => {
      if (jobId !== undefined) {
        this.adminService.deleteJobById(jobId).subscribe((deleted: boolean) => {
          if (deleted) this.fetchJobs();
        });
      }
    });
  }

  protected handleAddJob() {
    const dialogRef = this.dialog.open(AddJobDialogComponent);

    dialogRef.afterClosed().subscribe((job: JobDTO) => {
      console.log(job);
      if (job !== undefined) {
        this.adminService.addNewJob(job).subscribe((added) => {
          if (added) this.fetchJobs();
        })
      }
    });
  }


}
