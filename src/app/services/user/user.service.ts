import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
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
  /**
   * Base URL for the user service API
   * @private
   */
  #baseUrl = new URL('User', environment.apiUrl);

  /**
   * Constructor
   * @param http HttpClient
   * @param router Router
   */
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  /**
   * Handles the error response from the API
   * @param error - The error response from the API
   * @private
   */
  private handleError(error: HttpErrorResponse) {
    console.error(error);

    return throwError(() => new Error(String(error.status)));
  }

  /**
   * @inheritDoc
   */
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

  /**
   * @inheritDoc
   */
  login(loginDto: LoginDTO): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<string>(`${this.#baseUrl}/login`, loginDto, {
        headers,
        responseType: 'text' as 'json',
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * @inheritDoc
   */
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

  /**
   * @inheritDoc
   */
  getJobs(): Observable<GetJobDTO[]> {
    /**
     * no need to check token for jobs options since it is required in {@link RegisterComponent register} component
     */
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   return throwError(() => new Error('No token found'));
    // }
    //
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    // });

    console.log(this.#baseUrl);
    return this.http
      .get<
        GetJobDTO[]
      >(`${this.#baseUrl}/jobs`, { /* headers, */ responseType: 'json' })
      .pipe(catchError(this.handleError));
  }

  /**
   * @inheritDoc
   */
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

  /**
   * @inheritDoc
   */
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
