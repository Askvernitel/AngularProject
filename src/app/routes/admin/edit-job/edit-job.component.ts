import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddJobDialogComponent } from '@app/components/dialogs/add-job-dialog/add-job-dialog.component';
import { DeleteJobDialogComponent } from '@app/components/dialogs/delete-job-dialog/delete-job-dialog.component';
import { GetJobDTO, JobDTO } from '@app/dto';
import { AdminService, UserService } from '@app/services';
import { SnackBarService } from '@app/services/snack-bar/snack-bar.service';
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

  constructor(private adminService: AdminService, private userService: UserService, private dialog: MatDialog, private snackBarService: SnackBarService) {

  }
  private update() {
    this.fetchJobs();
  }

  protected handleDeleteJob(job: GetJobDTO) {
    const dialogRef = this.dialog.open(DeleteJobDialogComponent, { data: { job: job } });

    dialogRef.afterClosed().subscribe((jobId: number) => {
      if (jobId === undefined) {
        this.snackBarService.openInfoSnackBar({ text: "Job Was Not Deleted Window Closed", acceptText: "😥", duration: 3000 });
        return;
      }
      this.adminService.deleteJobById(jobId).subscribe((deleted: boolean) => {
        if (deleted) {
          this.snackBarService.openSuccessSnackBar({ text: "Job Was Deleted", acceptText: "👏", duration: 3000 });
          this.fetchJobs();
          return;
        }
        this.snackBarService.openErrorSnackBar({ text: "Job Was Not Deleted", acceptText: "😥", duration: 3000 });
      });
    });
  }

  protected handleAddJob() {
    const dialogRef = this.dialog.open(AddJobDialogComponent);

    dialogRef.afterClosed().subscribe((job: JobDTO) => {
      if (job === undefined) {
        this.snackBarService.openInfoSnackBar({ text: "Job Was Not Added Window Closed", acceptText: "😥", duration: 3000 });
        return;
      }
      this.adminService.addNewJob(job).subscribe((added) => {
        if (added) {
          this.snackBarService.openSuccessSnackBar({ text: "Job Was Added", acceptText: "🏢", duration: 3000 });
          this.fetchJobs();
          return
        }
        this.snackBarService.openErrorSnackBar({ text: "Job Was Not Added", acceptText: "😥", duration: 3000 });
      })
    });
  }


}
