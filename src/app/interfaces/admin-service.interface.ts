import { Observable } from 'rxjs';
import { JobDTO } from '@app/dto';

export interface IAdminService {
  approveScheduleRequest(scheduleId: number): Observable<boolean>;
  changeUserRole(userId: number, newRoleId: number): Observable<boolean>;
  addNewJob(jobDto: JobDTO): Observable<boolean>;
  deleteUserById(userId: number): Observable<boolean>;
  deleteJobById(jobId: number): Observable<boolean>;
  deleteScheduleById(id: number): Observable<boolean>;
}
