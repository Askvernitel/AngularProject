import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { JobDTO } from '@app/dto';
import { IAdminService } from '@app/interfaces';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService implements IAdminService {
  readonly #baseUrl = new URL('Admin', environment.apiUrl);

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<boolean> {
    console.error(`Error: ${error}`);
    return of(false);
  }

  approveScheduleRequest(scheduleId: number): Observable<boolean> {
    return this.http
      .post(`${this.#baseUrl}/approve-schedule-request`, {
        scheduleId,
      })
      .pipe(
        map(() => true),
        catchError(this.handleError),
      );
  }

  changeUserRole(userId: number, newRoleId: number): Observable<boolean> {
    return this.http
      .post(`${this.#baseUrl}/change-user-role`, {
        userId,
        newRoleId,
      })
      .pipe(
        map(() => true),
        catchError(this.handleError),
      );
  }
  addNewJob(jobDto: JobDTO): Observable<boolean> {
    return this.http.post(`${this.#baseUrl}/add-new-job`, jobDto).pipe(
      map(() => true),
      catchError((err) => this.handleError(err)),
    );
  }

  deleteUserById(userId: number): Observable<boolean> {
    return this.http.delete(`${this.#baseUrl}/delete-user/${userId}`).pipe(
      map(() => true),
      catchError((err) => this.handleError(err)),
    );
  }

  deleteJobById(jobId: number): Observable<boolean> {
    return this.http.delete(`${this.#baseUrl}/delete-job/${jobId}`).pipe(
      map(() => true),
      catchError((err) => this.handleError(err)),
    );
  }

  deleteScheduleById(id: number): Observable<boolean> {
    return this.http.delete(`${this.#baseUrl}/delete-schedule/${id}`).pipe(
      map(() => true),
      catchError((err) => this.handleError(err)),
    );
  }
}
