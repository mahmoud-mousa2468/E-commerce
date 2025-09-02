import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(items:any[],text:string): any[] {
    return items.filter((term)=>
      term.title.toLowerCase().includes(text.toLowerCase())
    );
  }

}
