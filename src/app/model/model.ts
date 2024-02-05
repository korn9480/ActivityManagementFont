import { FormAllergy } from "./form"

export interface ActivityModel{
    id:number
    nameActivity:string  
    location: string
    details:string 
    participants:number
    dateTimeStart:string
    dateTimeEnd:string 
    addBy:AddByModel 
    type:TypeActivityModel
    asset:AssetModel[]
}
export interface TypeActivityModel{
    id : number
    name_type:string
}
export interface AddByModel{
    id:number
    code_student:string
    first_name:string
    last_name:string
    profile:string
}
export interface AssetModel{
    id:number
    path:string
    type:number
    activityId:number
}
export interface RegisterModel {
    code_student: string
    profile:any
    prefix:string
    password: string ;
    confirm_password: string ;
    first_name: string ;
    last_name: string ;
    nick_name: string ;
    faculty: string ;
    major: string ;
    phone: string ;
    religion: string ;
    blood_group: string ;
    allergics : AllergyModel[];
    roleId : number
}
export interface ListParticipants{
    student:RegisterModel
}
export interface AllergyModel{
    id : number
    code_student:string
    allergy : string
}
