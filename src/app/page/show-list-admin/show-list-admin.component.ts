import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ApiUser } from 'src/app/API/api-user';
import { ActivityModel, AllergyModel, ListParticipants, RegisterModel } from 'src/app/model/model';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-show-list-admin',
  templateUrl: './show-list-admin.component.html',
  styleUrls: ['./show-list-admin.component.css'],

})
export class ShowListAdminComponent implements OnInit {
  
  list_name:ListParticipants[] = [] as ListParticipants[]
  activity!:ActivityModel
  placeholder="ค้นหาชื่อ,รหัสนิสิต,คณะ"
  textSearch =""
  isShowAllergics:boolean = false
  @ViewChild('myTable') myTable: ElementRef;
  tableData: any[] = []
  constructor(private api : ApiUser,private route:ActivatedRoute,private clipboardService:ClipboardService,
    table:ElementRef){
      this.myTable = table
    }

  coppyDataUser(){
    const table = document.querySelector('table');
    if (table) {
      const range = document.createRange();
      range.selectNode(table);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
      }
    }
  }

  ngOnInit(): void {
      let id = 0
      this.route.params.subscribe((data:any)=>{
        id = data.idActivity
        // this.nameactivity = data.nameActivity
      })
      this.api.get_activity_one(id).subscribe((data:ActivityModel)=>{
        this.activity = data
        console.log(this.activity.type.nameType )
        
      })
      this.api.get_list_students(id).subscribe((data:Array<ListParticipants>)=>{
        this.list_name = data
        console.log(data)
      })
  }
  isShowDataOfClub(d:RegisterModel){
    if (d.code_student.includes(this.textSearch) || 
      d.first_name.includes(this.textSearch) || 
      d.last_name.includes(this.textSearch) || 
      d.faculty.includes(this.textSearch)){
      return true
    }
    return false
  }
  isShowDataOfUser(d:RegisterModel){
    if (d.nick_name.includes(this.textSearch) || 
      d.faculty.includes(this.textSearch) || 
      d.major.includes(this.textSearch) ){
      return true
    }
    return false
  }
}
