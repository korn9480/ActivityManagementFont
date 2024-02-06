import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ApiUser } from '../API/api-user';
import { AllergyModel, ListParticipants, RegisterModel } from '../model/model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-list-admin',
  templateUrl: './show-list-admin.component.html',
  styleUrls: ['./show-list-admin.component.css'],

})
export class ShowListAdminComponent implements OnInit {
  
  list_name:ListParticipants[] = [] as ListParticipants[]
  
  nameactivity = "newyear"
  textSearch =""
  isShowAllergics:boolean = false
  constructor(private api : ApiUser,private route:ActivatedRoute){
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  ngOnInit(): void {
      let id = 0
      this.route.params.subscribe((data:any)=>{
        id = data.idActivity
        this.nameactivity = data.nameActivity
      })
      this.api.get_list_students(id).subscribe((data:Array<ListParticipants>)=>{
        this.list_name = data
      })
  }
  isShowName(d:RegisterModel){
    if (d.code_student.includes(this.textSearch) || 
      d.first_name.includes(this.textSearch) || 
      d.last_name.includes(this.textSearch) || 
      d.faculty.includes(this.textSearch)){
      return true
    }
    return false
  }
}
