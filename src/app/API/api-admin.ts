import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCookie } from '../service/cookie';
import { environment } from 'src/environments/environment.development';
@Injectable({
    providedIn : 'root'
})
export class ApiAdmin{
    constructor(public http: HttpClient,private cookie:UserCookie){}
    private localhost = environment.localhost_back

    get_header(){
        return {
            headers:{
                'authorization':this.cookie.get_token(),
            }
        }
    }
    create_activity(form:any){
        return this.http.post(this.localhost+"/activtiy",form,this.get_header())
    }
}