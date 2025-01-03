import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { AddScheduleDTO } from '@app/dto';
import { IWorkerService } from '@app/interfaces';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkerService implements IWorkerService {
  #baseUrl = new URL('Worker', environment.apiUrl);

  constructor(private http: HttpClient) { }

  addScheduleRequest(scheduleDto: AddScheduleDTO): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      return of(false);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .post(`${this.#baseUrl}/add-schedule-request`, scheduleDto, {
        headers,
        responseType: 'json',
      })
      .pipe(
        map(() => true),
        catchError((err) => {
          console.error(err);
          return of(false);
        }),
      );
  }
}
