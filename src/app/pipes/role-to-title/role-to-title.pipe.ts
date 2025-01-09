import { Pipe, PipeTransform } from '@angular/core';
import { RoleType } from '@enums/role-type';

@Pipe({
  name: 'roleToTitle',
  standalone: true,
})
export class RoleToTitlePipe implements PipeTransform {
  transform(value: RoleType): string {
    switch (value) {
      case RoleType.ADMIN:
        return 'Admin';
      case RoleType.WORKER:
        return 'Worker';
      default:
        return 'Unknown';
    }
  }
}
