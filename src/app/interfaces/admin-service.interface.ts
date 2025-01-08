import { Observable } from 'rxjs';
import { JobDTO } from '@app/dto';

/**
 * Admin service interface
 */
export interface IAdminService {
  /**
   * Approve schedule request
   * @param scheduleId Schedule id
   * @returns {Observable<boolean>} `true` if success, `false` otherwise
   */
  approveScheduleRequest(scheduleId: number): Observable<boolean>;

  /**
   * Change user role
   * @param userId User id
   * @param newRoleId New role id
   * @returns {Observable<boolean>} `true` if success, `false` otherwise
   */
  changeUserRole(userId: number, newRoleId: number): Observable<boolean>;

  /**
   * Add new job
   * @param jobDto Job data transfer object
   * @returns {Observable<boolean>} `true` if success, `false` otherwise
   */
  addNewJob(jobDto: JobDTO): Observable<boolean>;

  /**
   * Delete user by id
   * @param userId User id
   * @returns {Observable<boolean>} `true` if success, `false` otherwise
   */
  deleteUserById(userId: number): Observable<boolean>;

  /**
   * Delete job by id
   * @param jobId Job id
   * @returns {Observable<boolean>} `true` if success, `false` otherwise
   */
  deleteJobById(jobId: number): Observable<boolean>;

  /**
   * Delete schedule by id
   * @param id Schedule id
   * @returns {Observable<boolean>} `true` if success, `false` otherwise
   */
  deleteScheduleById(id: number): Observable<boolean>;
}
