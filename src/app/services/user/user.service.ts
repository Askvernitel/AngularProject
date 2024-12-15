import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {
  GetJobDTO,
  GetUsersDTO,
  LoginDTO,
  ScheduleDTO,
  UserDTO,
} from '@app/dto';
import { IUserService } from '@app/interfaces';
import { User } from '@app/entities';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  #baseUrl = new URL('User', environment.apiUrl);

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => new Error(error.message));
  }

  register(userDto: UserDTO): Observable<User> {
    return this.http
      .post<User>(`${this.#baseUrl}/register`, userDto)
      .pipe(catchError(this.handleError));
  }

  login(loginDto: LoginDTO): Observable<string> {
    return this.http
      .post<string>(`${this.#baseUrl}/login`, loginDto)
      .pipe(catchError(this.handleError));
  }

  getDashboard(): Observable<ScheduleDTO[]> {
    return this.http
      .get<ScheduleDTO[]>(`${this.#baseUrl}/dashboard`)
      .pipe(catchError(this.handleError));
  }

  getJobs(): Observable<GetJobDTO[]> {
    return this.http
      .get<GetJobDTO[]>(`${this.#baseUrl}/jobs`)
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<GetUsersDTO[]> {
    return this.http
      .get<GetUsersDTO[]>(`${this.#baseUrl}/users`)
      .pipe(catchError(this.handleError));
  }
}
