import { Pipe, PipeTransform } from '@angular/core';
import { Months } from '@app/enums/months';

@Pipe({
  name: 'toMonth',
  standalone: true,
})
export class ToMonthPipe implements PipeTransform {
  transform(value: Months): keyof typeof Months | null {
    if (value in Months) {
      return Months[value] as keyof typeof Months;
    }

    return null;
  }
}
