import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Cookie } from '../cookie';

@Injectable({
    providedIn: 'root'
})
export class GuardPage implements CanActivate{
    constructor(private router: Router,private cookie:Cookie) {}

    isLogin(){
        // bearer มี6 ตัวอักษร
        return this.cookie.get_token().length > 7
    }
    canActivate(route:ActivatedRouteSnapshot,state :RouterStateSnapshot ): boolean {
        console.log(route)
        console.log(state)
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