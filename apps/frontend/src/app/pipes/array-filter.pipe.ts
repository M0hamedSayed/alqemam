import { ITodo } from '@alqemam/shared';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter',
})
export class ArrayFilterPipe implements PipeTransform {
  transform(value: ITodo[], filter: string): ITodo[] {
    if (!filter) return value;
    if (!value) return new Array(10).fill({});
    return value.filter((obj: object) => {
      const data = Object.values(obj);
      return JSON.stringify(data).toLowerCase().includes(filter);
    });
  }
}
