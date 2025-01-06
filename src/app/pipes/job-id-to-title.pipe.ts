import { Pipe, PipeTransform } from '@angular/core';
import { GetJobDTO } from '@app/dto';
import { UserService } from '@app/services';
import { catchError, filter, from, map, Observable, of, switchMap } from 'rxjs';

@Pipe({
  name: 'jobIdToTitle',
  standalone: true
})
export class JobIdToTitlePipe implements PipeTransform {
  constructor(private userService: UserService) {

  }
  transform(value: number | null, ...args: unknown[]): Observable<string> {
    return this.userService.getJobs().pipe(map((data: GetJobDTO[]) => {
      return data.filter(d => d.id === value)
    }), switchMap((data: GetJobDTO[]) => { console.log(data[0]); return of(data[0].title ?? ""); }));
  }

}
