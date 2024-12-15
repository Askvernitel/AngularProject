import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { AddScheduleDTO } from '@app/dto';
import { IWorkerService } from '@app/interfaces';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkerService implements IWorkerService {
  #baseUrl = new URL('Worker', environment.apiUrl);

  constructor(private http: HttpClient) {}

  addScheduleRequest(scheduleDto: AddScheduleDTO): Observable<boolean> {
    return this.http
      .post(`${this.#baseUrl}/add-schedule-request`, scheduleDto)
      .pipe(
        map(() => true),
        catchError((err) => {
          console.error(err);
          return of(false);
        }),
      );
  }
}
