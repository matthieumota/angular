import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true
})
export class AgePipe implements PipeTransform {
  // transform(value: string, suffix: string = ''): string {
  transform(value: string, ...args: string[]): string {
    const today = new Date();
    const birthday = new Date(value);
    let age = today.getFullYear() - birthday.getFullYear();
    const suffix = args[0] || '';

    if (today.getMonth() < birthday.getMonth()) {
      age -= 1;
    }

    return `${age}${suffix ? (' ' + suffix) : ''}`;
  }
}
