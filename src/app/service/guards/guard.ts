import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserCookie } from '../cookie';

@Injectable({
    providedIn: 'root'
})
export class GuardPage implements CanActivate{
    constructor(private router: Router,private cookie:UserCookie) {}

    isLogin(){
        // bearer มี6 ตัวอักษร
        return this.cookie.get_token().length > 7
    }
    canActivate(route:ActivatedRouteSnapshot,state :RouterStateSnapshot ): boolean {
        if (this.isLogin()){
              return true;
        }
        if (state.url.includes('join-activity')){
           this.cookie.set_page_befor(state.url) 
        }
        this.router.navigate(['/login'])
        return false
    }
}

@Injectable({
    providedIn: 'root'
})
export class GuardPageProfile implements CanActivate {
    constructor(private router:Router, private userCookie:UserCookie){}
    canActivate(route:ActivatedRouteSnapshot,state :RouterStateSnapshot ){

        let page = this.userCookie.get_page_befor()
        console.log(state.url)
        if (state.url.includes("profile")){
            if (this.userCookie.get_role()=="admin" && page!='c-profile'){
                this.userCookie.set_page_befor('c-profile')
                this.router.navigate(['/c-profile'])
            }
            else if (this.userCookie.get_role()=="user" &&  page!='profile') {
                this.userCookie.set_page_befor('profile')
                this.router.navigate(['/profile'])
            }
            else {
                // return false
            }

        }
        return true
    }
}