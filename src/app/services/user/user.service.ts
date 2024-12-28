import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
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

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  private handleError(error: HttpErrorResponse) {
    console.error(error);

    return throwError(() => new Error(error.message));
  }

  register(userDto: UserDTO): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<User>(`${this.#baseUrl}/register`, userDto, {
        headers,
        responseType: 'json',
      })
      .pipe(catchError(this.handleError));
  }

  login(loginDto: LoginDTO): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<string>(`${this.#baseUrl}/login`, loginDto, {
        headers,
        responseType: 'json',
      })
      .pipe(catchError(this.handleError));
  }

  getDashboard(): Observable<ScheduleDTO[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<
        ScheduleDTO[]
      >(`${this.#baseUrl}/dashboard`, { headers, responseType: 'json' })
      .pipe(catchError(this.handleError));
  }

  getJobs(): Observable<GetJobDTO[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<
        GetJobDTO[]
      >(`${this.#baseUrl}/jobs`, { headers, responseType: 'json' })
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<GetUsersDTO[]> {

    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<
        GetUsersDTO[]
      >(`${this.#baseUrl}/users`, { headers, responseType: 'json' })
      .pipe(catchError(this.handleError));
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('token');
    this.router.navigate(['/login']).then(
      (value) => {
        if (!value) {
          console.error('Failed to navigate to login page');
        }
      },
      (reason) => {
        console.error(reason);
      },
    );
    return of(!localStorage.getItem('token'));
  }
}
