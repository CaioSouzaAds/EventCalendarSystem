import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import { Constants } from '../util/constants';

@Pipe({
  name: 'dateTimeFormatPipe',
})
export class DataTimeFormatPipe implements PipeTransform {
  transform(value: string, format: string = Constants.DATE_TIME_FMT): string {
    return formatDate(value, format, 'en-US');
  }
}
