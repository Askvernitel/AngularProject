import {
  UserDTO,
  LoginDTO,
  ScheduleDTO,
  GetJobDTO,
  GetUsersDTO,
} from '@app/dto';
import { User } from '@app/entities';
import { Observable } from 'rxjs';

export interface IUserService {
  register(userDto: UserDTO): Observable<User>;
  login(loginDto: LoginDTO): Observable<string>;
  getDashboard(): Observable<ScheduleDTO[]>;
  getJobs(): Observable<GetJobDTO[]>;
  getUsers(): Observable<GetUsersDTO[]>;
}
