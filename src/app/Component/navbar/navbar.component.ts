import { Component, Input, OnInit } from '@angular/core';
import { ClubCookie, UserCookie } from 'src/app/service/cookie';
import { FormRegister } from 'src/app/model/form';
import { RegisterModel } from 'src/app/model/model';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUser } from 'src/app/API/api-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(
    private userCookie:UserCookie,private clubCookie:ClubCookie,
    private router : Router,private api:ApiUser){}

  @Input('profile') profileImageSrc: string = '../../assets/image/profile.png';
  
  is_edit:boolean = true;
  form! : RegisterModel|FormRegister
  urlFile:any
  isDropdownOpen: boolean = false;
  menuMobile = false
  profileNow = ""
  fullNameNow = ""
  localhost_asset =  environment.localhost_back+"/asset/"
  isShowSwitch = false
  roleName = ""
  pathPageProfile = ""

  ngOnInit(): void {
    if (this.userCookie.get_role()=="user"){
      this.loadDateClub()
    }
    this.isShowSwitch = this.userCookie.get_is_admin()
    if (this.userCookie.get_role()=="admin"){
      this.pathPageProfile = "c-profile"
      this.profileNow = this.localhost_asset + this.userCookie.get_profile()
      this.profileImageSrc = this.localhost_asset + this.clubCookie.getProfile()
      console.log(this.profileImageSrc)
      this.fullNameNow = this.userCookie.get_full_name()
    }
    else {
      this.loadProfileUser()
      this.fullNameNow = this.clubCookie.getName()
      this.profileNow =this.localhost_asset + this.clubCookie.getProfile()
      this.pathPageProfile = "profile"
    }
    this.roleName = this.userCookie.get_role()

  }
  loadProfileUser(){
    this.profileImageSrc = this.userCookie.get_profile()
    if (this.profileImageSrc.includes(this.userCookie.get_code_student())){
      this.profileImageSrc = this.localhost_asset + this.profileImageSrc
    }
    else {
      let profix = this.userCookie.get_prefix()
      if (profix=="นาย"){
        this.profileImageSrc = '../../assets/image/profile.png';
      }
      else if (profix=="นางสาว"){
        this.profileImageSrc = '../../assets/image/profile-girl.png'
      }
    }
  }

  refresh(){
    window.location.reload()
  }

  switchRole(){
    if (this.userCookie.get_role()=="admin"){
      this.userCookie.set_role('user')

    }
    else {
      this.userCookie.set_role('admin')
    }
    this.refresh()
  }
  
  loadDateClub(){
    this.api.get_admin_date().subscribe((data:RegisterModel)=>{
      console.log(data)
      this.clubCookie.setName(data.first_name,data.last_name)
      this.clubCookie.setProfile(data.profile)
      this.clubCookie.setCode(data.code_student)
      this.fullNameNow = this.clubCookie.getName()
      this.profileNow =this.localhost_asset + this.clubCookie.getProfile()
    })
  }

  setChangeIsEdit(){
    this.is_edit = false;
  }

  UserDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(){
    this.userCookie.logout()
    console.log("dkdkdk")
    this.router.navigate(['/login'])
  }

  clickNavbar(){
    this.menuMobile = !this.menuMobile
  }
}
