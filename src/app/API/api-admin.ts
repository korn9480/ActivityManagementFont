import { query } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCookie } from 'src/app/service/cookie';
import { environment } from 'src/environments/environment.development';
import { AdminModel } from '../model/model';

class SearchPagination {
    list: number = 10
    page: number = 1
    sort: "DESC"|"ASC" = "ASC"
}

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

    addAdmin(code_student_add:string){
        return this.http.post(this.localhost+"/admin/add_admin",
        {
            newAdmin:code_student_add,
            addBy: this.cookie.get_code_student()
        },this.get_header())
    }

    deleteAdmin(idAdmin:number){
        return this.http.delete(this.localhost+"/admin/"+idAdmin,this.get_header())
    }

    getAdminPagination(search:SearchPagination = new SearchPagination()){
        let query = new HttpParams()
        .set('limit',search.list).set('page',search.page).set('sort',search.sort)
        return this.http.get<{data:AdminModel[],totalCount:0}>(this.localhost+"/admin/pagination",{headers:this.get_header().headers,params:query,})
    }
}