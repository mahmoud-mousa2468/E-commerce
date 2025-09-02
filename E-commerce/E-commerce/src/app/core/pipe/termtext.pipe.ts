import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termtext',
  standalone: true
})
export class TermtextPipe implements PipeTransform {

  transform(value:string,limit:number):string {
    return value.split(" ",limit).join(" ");
  }

}
