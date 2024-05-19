import { NgModule } from "@angular/core";
import { CodeYear, PrintAllergics, RepFacMamjor, ThaiDatePipe, ThaiDateTimePipe, ThaiTime } from "./pipes";

@NgModule({
    declarations:[ThaiDatePipe,ThaiDateTimePipe,ThaiTime,CodeYear,PrintAllergics,RepFacMamjor],
    imports:[],
    exports:[ThaiDatePipe,ThaiDateTimePipe,ThaiTime,CodeYear,PrintAllergics,RepFacMamjor]
})
export class PipeModele{}