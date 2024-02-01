import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Cookie } from '../Cookie/cookie';
import { ActivityModel, AssetModel } from '../model/model';
import { FormAsset, FormRegister } from '../model/form';
import { environment } from 'src/environments/environment.development';
@Injectable({
    providedIn : 'root'
})
export class ApiUser{
    constructor(public http: HttpClient,private cookie:Cookie){}
    private localhost = environment.localhost_back

    get_header(){
        return {
            headers:{
                'authorization':this.cookie.get_token(),
            }
        }
    }
    // api auth
    login_user(form:any){
        return this.http.post(this.localhost+"/auth/sign-in",form)
    }
    // logout_user(){
    //     return this.http.delete
    // }
    register_user(form:any){
        console.log(form)
        return this.http.post(this.localhost+"/auth/sign-up",form)
    }
    forgotPassword(form:any){
        return this.http.post(this.localhost+"/auth/forgot-password",form)
    }
    update_user(form:any){
        return this.http.put(this.localhost+"/auth",form,this.get_header())
    }
    // api user
    get_profile(){
        console.log(this.cookie.get_code_student())
        return this.http.get(this.localhost+"/users/profile/"+this.cookie.get_code_student(),this.get_header())
    }
    upload_profile(file:any){
        let formData = new FormData()
        formData.append('profile',file)
        return this.http.post(this.localhost+"/users/profile/"+this.cookie.get_code_student(),formData,this.get_header())
    }
    // api activity
    create_activity(form:any){
        return this.http.post(this.localhost+"/activity",form,this.get_header())
    }
    get_activity_open_join(){
        console.log(this.get_header())
        return this.http.get<ActivityModel[]>(this.localhost+"/activity/open_join",this.get_header())
    }
    get_activity_one(id:number){
        return this.http.get<ActivityModel>(this.localhost+"/activity/"+id,this.get_header())
    }
    delete_activity(activity_id:number){
        return this.http.delete(this.localhost+"/activity/"+activity_id,this.get_header())
    }
    update_activity(activity_id:number,form:any){
        console.log(form)
        form.type = form.type.id
        return this.http.put(this.localhost+"/activity/"+activity_id,form,this.get_header())
    }
    get_join_activity(id:number){
        return this.http.get(this.localhost+"/activity/perplo_join/"+id,this.get_header())
    }
    get_activity_club_by_year(year:string){
        return this.http.get<ActivityModel[]>(this.localhost+"/activity/club/"+year,this.get_header())
    }
    joinActivity(id:number,form:any){
        console.log(form)
        return this.http.post(this.localhost+"/activity/join/"+id,form,this.get_header())
    }
    cancelJoinActivity(form:any){
        console.log(form)
        return this.http.post(this.localhost+"/activity/cancel",form,this.get_header())
    }
    // api asset
    get_image_profile(){
        return this.http.get(this.localhost+"/asset/"+this.cookie.get_profile())
    }
    create_asset(fileUpload:FormAsset[],activity_id:number){
        let formData = new FormData()
        console.log('asset')
        console.log(fileUpload)
        let number = 1
        fileUpload.forEach((asset:FormAsset)=>{
            asset.activityId = activity_id
            console.log(asset.path.name)
            formData.append('path',asset.path)
            number += 1
        })
        formData.append('activityId',activity_id+"")
        formData.append('type',fileUpload[0].type+"")
        console.log('api console')
        return this.http.post(this.localhost+"/asset",formData,this.get_header())
    }
    update_asset(fileUpload:FormAsset[], activity_id:number){
        let formData = new FormData()
        fileUpload.forEach((asset:any)=>{
            asset.activityId = activity_id
            formData.append('path',asset.path)
        })
        formData.append('activityId',activity_id+"")
        formData.append('type',fileUpload[0].type+"")
        console.log('api console')
        return this.http.post(this.localhost+"/asset",formData,this.get_header())
    }
    delete_asset(asset_id:number,activity_id:number){
        return this.http.delete(this.localhost+'/asset/'+activity_id+'/'+asset_id,this.get_header())
    }
    
}