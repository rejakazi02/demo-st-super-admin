import { filter } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unionFilter'
})
export class UnionFilterPipe implements PipeTransform {

  transform(value: any, search:any) {

    
    if(search){
      return value.filter((data:any)=>{
        return data.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      })
    }
    else{
      return value;
    }
  }

} 
