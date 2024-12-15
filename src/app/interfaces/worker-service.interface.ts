import { AddScheduleDTO } from '@app/dto';
import { Observable } from 'rxjs';

export interface IWorkerService {
  addScheduleRequest(scheduleDto: AddScheduleDTO): Observable<boolean>;
}
