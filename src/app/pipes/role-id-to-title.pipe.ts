import { Pipe, PipeTransform } from '@angular/core';
import { RoleType } from '@app/enums/role-type';
import { Observable } from 'rxjs';

@Pipe({
  name: 'roleIdToTitle',
  standalone: true
})
export class RoleIdToTitlePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value == RoleType.ADMIN) {
      return "Admin";
    } else if (value == RoleType.WORKER) {
      return "Worker";
    } else {
      return "Unknown";
    }
  }

}
