import { Pipe, PipeTransform } from '@angular/core';
import { AllergyModel } from '../model/model';
class ThaiTimeService {
  mapMonth(index:number):string{
    const thaiMonths = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    return thaiMonths[index]
  }
  setFormatTime(value:number):string{
    return (value==0)? '00':value+""
  }
}

@Pipe({
  name: 'thaiDate'
})
export class ThaiDatePipe extends ThaiTimeService implements PipeTransform {
  transform(value: string): string {
    if (value.length<=0){
      return ""
    }
    const date = new Date(value)
    return `${date.getDate()} ${this.mapMonth(date.getMonth())} ${date.getFullYear() + 543}`;
  }
}

@Pipe({
  name: 'thaiDateTime'
})
export class ThaiDateTimePipe extends ThaiTimeService implements PipeTransform {
  transform(value: string): string {
    if (value.length<=0){
      return ""
    }
    const date = new Date(value)
    
    return `${date.getDate()} ${this.mapMonth(date.getMonth())} ${date.getFullYear() + 543}, ${this.setFormatTime(date.getHours())}:${this.setFormatTime(date.getMinutes())}`;
  }
}

@Pipe({
  name:'thaiTime'
})
export class ThaiTime extends ThaiTimeService implements PipeTransform{
  transform(value: string, ...args: any[]) {
    if (value.length<=0){
      return ""
    }
    const date = new Date(value)
    return `${this.setFormatTime(date.getHours())}.${this.setFormatTime(date.getMinutes())}`;
  }
}
@Pipe({
name:'codeYear'
})
export class CodeYear extends ThaiTimeService implements PipeTransform{
  transform(value: string, ...args: any[]) {
    // 64021700
    let codeLevel = +value.substring(0,2)
    let year = +((new Date().getFullYear()+543) +"").substring(2,4)
    let m = new Date('2024-05-20').getMonth()+1
    if (m < 6){
      year =year -1
    }
    return year-codeLevel+1
  }
}

@Pipe({
  name:'printAllergics'
  })
  export class PrintAllergics implements PipeTransform{
    transform(value: AllergyModel[] ):string {
      // 64021700
      let text = ""
      for (let i of value){
        text += i.allergy
      }
      text = (text =="")? "-":text
      return text
    }
  }