import { Component, Input, OnInit } from '@angular/core';
import { Cookie } from 'src/app/service/cookie';
import { FormRegister } from 'src/app/model/form';
import { RegisterModel } from 'src/app/model/model';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private cookie:Cookie){}

  @Input('profile') profileImageSrc: string = '../../assets/image/profile.png';
  
  is_edit:boolean = true;
  form! : RegisterModel|FormRegister
  urlFile:any
  isDropdownOpen: boolean = false;

  ngOnInit(): void {
    this.profileImageSrc = this.cookie.get_profile()
    if (this.profileImageSrc.includes(this.cookie.get_code_student())){
      this.profileImageSrc = environment.localhost_back+"/asset/" + this.profileImageSrc
    }
    else {
      let profix = this.cookie.get_prefix()
      if (profix=="นาย"){
        this.profileImageSrc = '../../assets/image/profile.png';
      }
      else if (profix=="นางสาว"){
        this.profileImageSrc = '../../assets/image/profile-girl.png'
      }
    }
  }

  setChangeIsEdit(){
    this.is_edit = false;
  }



  UserDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
