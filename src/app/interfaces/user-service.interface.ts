import {
  UserDTO,
  LoginDTO,
  ScheduleDTO,
  GetJobDTO,
  GetUsersDTO,
} from '@app/dto';
import { User } from '@app/entities';
import { Observable } from 'rxjs';

/**
 * User service interface.
 */
export interface IUserService {
  /**
   * Register a new user.
   * @param userDto User data transfer object.
   * @returns {Observable<User>} The registered user.
   */
  register(userDto: UserDTO): Observable<User>;
  /**
   * Log in a user.
   * @param loginDto Login data transfer object.
   * @returns {Observable<string>} The JWT token.
   */
  login(loginDto: LoginDTO): Observable<string>;
  /**
   * Get the dashboard.
   * @returns {Observable<ScheduleDTO[]>} The dashboard.
   */
  getDashboard(): Observable<ScheduleDTO[]>;

  /**
   * Get all jobs.
   * @returns {Observable<GetJobDTO[]>} All jobs.
   */
  getJobs(): Observable<GetJobDTO[]>;

  /**
   * Get all users.
   * @returns {Observable<GetUsersDTO[]>} All users.
   */
  getUsers(): Observable<GetUsersDTO[]>;
}
