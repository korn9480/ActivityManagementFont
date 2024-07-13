export interface ActivityModel{
    id:number
    nameActivity:string  
    location: string
    details:string 
    participants:number
    number_pp:number
    dateTimeStart:string
    dateTimeEnd:string 
    addBy:AddByModel
    is_open_join:boolean 
    type:TypeActivityModel
    asset:AssetModel[]
}
export interface TypeActivityModel{
    id : number
    nameType:string
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
    allergies : AllergyModel[];
    roleId : number
}
export interface ListParticipants{
    student:RegisterModel
}

export interface AdminModel extends RegisterModel {
    is_delete: string
    id:number
}

export interface AllergyModel{
    // id : number
    code_student:string
    allergy : string
}

export interface PaginationModel<T>{
    total:number
    data:T[]
}