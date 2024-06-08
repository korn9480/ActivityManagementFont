import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventAddArg, EventInput, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { ApiUser } from 'src/app/API/api-user';
import { ActivityModel } from 'src/app/model/model';
import { Router } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  constructor(private api:ApiUser,private router:Router,private cdr: ChangeDetectorRef){}
  eventAll:any[] =[]
  yearSearch:number = new Date().getFullYear()
  calendarOptions: CalendarOptions = {
    contentHeight:360,
    initialView: 'dayGridMonth',
    plugins:[dayGridPlugin,listPlugin],
    locale: 'th',
    eventClick: this.handleDateClick.bind(this),
    eventColor:'purple',
    events: [],
    headerToolbar:{
      left: 'title',
      center: 'dayGridMonth,listMonth',
      right: 'prev,next'
    },
    datesSet: event=>{
      event.start.setDate(event.start.getDate()+7)
      this.loadEvent(event.start.getFullYear())
    },
  };
  eventInput: EventInput[] = [];
  
  ngOnInit(): void {
    let date = new Date()
    this.loadEvent(date.getFullYear())
  }
  loadEvent(year:number){
    if (this.yearSearch!=year || this.eventInput.length==0){
      this.yearSearch = year
      this.api.get_activity_club_by_year(year+543+"").subscribe((data:ActivityModel[])=>{      
        let events:any[] = []
        data.forEach((ac:ActivityModel)=>{
          events.push({
            title: ac.nameActivity,
            start: ac.dateTimeStart,
            end: ac.dateTimeEnd,
            id:ac.id,
          })
        })
        this.eventInput = events
      })
    }
  }
  handleDateClick(arg:any) {
    this.router.navigate(['/view-data-activity/'+arg.event.id])
  }
}
