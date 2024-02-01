import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventAddArg, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ApiUser } from '../API/api-user';
import { ActivityModel } from '../model/model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  constructor(private api:ApiUser){}
  events:any[] =[]
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins:[dayGridPlugin],
    eventClick:((data:any)=>{
      this.handleDateClick(data)
    }),
  
    // dateClick:this.handleDateClick(this)
    // dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    events: []
  };
  ngOnInit(): void {
    let date = new Date()
    this.api.get_activity_club_by_year(date.getFullYear()+"").subscribe((data:ActivityModel[])=>{

      
      data.forEach((ac:ActivityModel)=>{
        this.events.push({title:ac.nameActivity,date:ac.dateTimeStart})
      })
      console.log(this.events)
      this.calendarOptions.events = this.events
      console.log(this.calendarOptions.events)
    })
    // this.calendarOptions.events = this.events
  }
  handleDateClick(arg:any) {
    alert('date click! ' + arg.dateStr)
  }
}
