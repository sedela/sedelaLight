import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByPipe'
})
export class OrderByPipe implements PipeTransform {

  transform(array: Array<any>, args: any): Array<any> {

    if(!array || array === undefined || array.length === 0) return null;
  
      array.sort((a: any, b: any) => {
        if (a.last_date_modified < b.last_date_modified) {
          return -1;
        } else if (a.last_date_modified > b.last_date_modified) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }
  

}
