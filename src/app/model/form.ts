export class FormNewActiviy{
    constructor(type_activity:string,code_student:string){
        if (type_activity=="user") this.type = 1
        else if (type_activity=='admin') this.type = 2
        this.addBy = code_student
    }
    id:number = 0
    nameActivity:string  = ''
    location: string = ''
    details:string = ''
    participants:number = 0
    dateTimeStart:string = ''
    dateTimeEnd:string = ''
    addBy:string = ''
    type:number = 0
    asset:FormAsset[] = []
}
export class FormAsset{
    constructor(path:any,type:number){
        this.path = path
        this.type = type
    }
    id:number = 0
    path:any = ""
    type:number = 0
    activityId:number = 5
}
export class FormAllergy{
    constructor(code_student:string,allergy:string){
        this.code_student = code_student
        this.allergy = allergy
    }
    code_student:string = ""
    allergy : string = ""
}
export class FormRegister {
    // id :string = ""
    code_student: string = "";
    prefix:string=""
    profile:any
    password: string = "";
    confirm_password: string = "";
    first_name: string = "";
    last_name: string = "";
    nick_name: string = "";
    faculty: string = "";
    major: string = "";
    phone: string = "";
    religion: string = "";
    blood_group: string = "";
    allergics : FormAllergy[] = [];
    roleId : number = 1
  }