import { AddScheduleDTO } from '@app/dto';
import { Observable } from 'rxjs';

/**
 * Interface for worker-related operations.
 * @see WorkerService
 * @see AddScheduleDTO
 */
export interface IWorkerService {
  /**
   * Adds a schedule request.
   * @param scheduleDto {AddScheduleDTO} - The schedule request to add.
   * @returns Observable<boolean> - True if the schedule request was added successfully, false otherwise.
   */
  addScheduleRequest(scheduleDto: AddScheduleDTO): Observable<boolean>;
}
