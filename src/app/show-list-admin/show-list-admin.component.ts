import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ApiUser } from '../API/api-user';
import { ListParticipants } from '../model/model';

@Component({
  selector: 'app-show-list-admin',
  templateUrl: './show-list-admin.component.html',
  styleUrls: ['./show-list-admin.component.css'],

})
export class ShowListAdminComponent implements OnInit {
  
  list_name:ListParticipants[] = [] as ListParticipants[]
  
  nameactivity = "newyear"
  constructor(private api : ApiUser){
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  ngOnInit(): void {
      this.api.get_list_students(2).subscribe((data:Array<ListParticipants>)=>{
        this.list_name = data
      })
  }
}
