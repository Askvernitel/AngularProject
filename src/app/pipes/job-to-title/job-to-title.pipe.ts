import { Pipe, PipeTransform } from '@angular/core';
import { GetJobDTO } from '@app/dto';
import { UserService } from '@app/services';
import { map, Observable, of, switchMap } from 'rxjs';

@Pipe({
  name: 'jobToTitle',
  standalone: true,
})
export class JobToTitlePipe implements PipeTransform {
  constructor(private userService: UserService) {}

  transform(value: number | null): Observable<string> {
    return this.userService.getJobs().pipe(
      map((data: GetJobDTO[]) => {
        return data.filter((job) => job.id === value);
      }),
      switchMap((data: GetJobDTO[]) => {
        console.log(data[0]);
        return of(data[0].title ?? '');
      }),
    );
  }
}
