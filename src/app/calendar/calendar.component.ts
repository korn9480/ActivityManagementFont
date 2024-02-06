import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ApiUser } from '../API/api-user';
import { ActivityModel } from '../model/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  constructor(private api:ApiUser,private router:Router){}
  events:any[] =[]
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins:[dayGridPlugin],
    locale: 'th',
    eventClick: this.handleDateClick.bind(this),
    eventColor:'purple',
    events: [],
    headerToolbar:{
           left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    }
  };
  ngOnInit(): void {
    let date = new Date()
    this.api.get_activity_club_by_year(date.getFullYear()+"").subscribe((data:ActivityModel[])=>{      
      data.forEach((ac:ActivityModel)=>{
        this.events.push({
            title: ac.nameActivity,
            start: ac.dateTimeStart,
            end: ac.dateTimeEnd,
            id:ac.id,
            // display: 'background'
          })
      })
      this.calendarOptions.events = this.events
    })
    // this.calendarOptions.events = this.events
  }
  handleDateClick(arg:any) {
    this.router.navigate(['/view-data-activity/'+arg.event.id])
  }
}
