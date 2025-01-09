import { Pipe, PipeTransform } from '@angular/core';
import { Days } from '@enums/days';

@Pipe({
  name: 'toWeekday',
  standalone: true,
})
export class ToWeekdayPipe implements PipeTransform {
  transform(value: Days): keyof typeof Days | null {
    if (value in Days) {
      return Days[value] as keyof typeof Days;
    }

    return null;
  }
}
