import { Pipe, PipeTransform } from '@angular/core';
import { GetJobDTO } from '@app/dto';
import { UserService } from '@app/services';
import { filter, Observable, of } from 'rxjs';

@Pipe({
  name: 'jobIdToTitle',
  standalone: true
})
export class JobIdToTitlePipe implements PipeTransform {
  constructor(private userService: UserService) {

  }
  transform(value: string, ...args: unknown[]): Observable<string> {
    //return this.userService.getJobs().pipe(filter());
    return of("")

  }

}
