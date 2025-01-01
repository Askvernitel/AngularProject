import { Pipe, PipeTransform } from '@angular/core';
import { Days } from '@app/enums/days';
import { Months } from '@app/enums/months';

@Pipe({
  name: 'numDateConv',
  standalone: true
})
export class NumericDateConverterPipe implements PipeTransform {

  transform(value: number, ...args: string[]): string | undefined {
    let type: string = args[0].toLowerCase();
    if (type == "month") {
      return Months[value];
    } else if (type == "day") {
      return Days[value];
    }

    return undefined;
  }

}
