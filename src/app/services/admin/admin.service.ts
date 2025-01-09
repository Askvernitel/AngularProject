import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, Subject, throwError } from 'rxjs';
import { JobDTO } from '@app/dto';
import { IAdminService } from '@app/interfaces';
import { environment } from '@env/environment';

/**
 * Admin service
 */
@Injectable({
  providedIn: 'root',
})
export class AdminService implements IAdminService {
  /**
   * Base url for the admin service API
   * @private
   */
  readonly #baseUrl = new URL('Admin', environment.apiUrl);
  changes: Subject<boolean> = new Subject();
  private update() {
    this.changes.next(true);
  }

  /**
   * Constructor
   * @param http HttpClient
   */
  constructor(private http: HttpClient) { }

  /**
   * Method to handle errors
   * @param error HttpErrorResponse
   * @returns Observable<boolean>
   */
  private handleError(error: HttpErrorResponse): Observable<boolean> {
    console.log(error);
    console.error(`Error: ${error}`);
    return of(false);
  }

  /**
   * @inheritDoc
   */
  approveScheduleRequest(scheduleId: number): Observable<boolean> {
    return this.http
      .post(
        `${this.#baseUrl}/approve-schedule-request?scheduleId=${scheduleId}`,
        {},
      )
      .pipe(
        map(() => { this.update(); return true; }),
        catchError(this.handleError),
      );
  }

  /**
   * @inheritDoc
   */
  changeUserRole(userId: number, newRoleId: number): Observable<boolean> {
    return this.http
      .post(`${this.#baseUrl}/change-user-role`, {
        userId,
        newRoleId,
      })
      .pipe(
        map(() => { this.update(); return true; }),
        catchError(this.handleError),
      );
  }

  /**
   * @inheritDoc
   */
  addNewJob(jobDto: JobDTO): Observable<boolean> {
    return this.http.post(`${this.#baseUrl}/add-new-job`, jobDto).pipe(
      map(() => { this.update(); return true; }),
      catchError((err) => this.handleError(err)),
    );
  }

  /**
   * @inheritDoc
   */
  deleteUserById(userId: number): Observable<boolean> {
    return this.http.delete(`${this.#baseUrl}/delete-user/${userId}`).pipe(
      map(() => { this.update(); return true; }),
      catchError((err) => this.handleError(err)),
    );
  }

  /**
   * @inheritDoc
   */
  deleteJobById(jobId: number): Observable<boolean> {
    this.update();
    return this.http.delete(`${this.#baseUrl}/delete-job/${jobId}`).pipe(
      map(() => { this.update(); return true; }),
      catchError((err) => this.handleError(err)),
    );
  }

  /**
   * @inheritDoc
   */
  deleteScheduleById(id: number): Observable<boolean> {
    this.update();
    return this.http.delete(`${this.#baseUrl}/delete-schedule/${id}`).pipe(
      map(() => { this.update(); return true; }),
      catchError((err) => this.handleError(err)),
    );
  }
}
