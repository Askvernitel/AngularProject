import { Component, OnInit } from '@angular/core';
import { GetJobDTO } from '@app/dto';
import { AdminService, UserService } from '@app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.css'
})
export class EditJobComponent implements OnInit {
  jobs$!: Observable<GetJobDTO[]>;
  columns: string[] = ["Job Id", "Job Title", "Operations"];
  ngOnInit(): void {
    this.fetchJobs();
  }

  private fetchJobs() {
    this.jobs$ = this.userService.getJobs();
  }

  constructor(private adminService: AdminService, private userService: UserService) {

  }


  protected handleDeleteJob(id: number) {

  }
}
