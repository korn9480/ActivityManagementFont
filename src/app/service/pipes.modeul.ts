import { NgModule } from "@angular/core";
import { CodeYear, PrintAllergics, ThaiDatePipe, ThaiDateTimePipe, ThaiTime } from "./pipes";

@NgModule({
    declarations:[ThaiDatePipe,ThaiDateTimePipe,ThaiTime,CodeYear,PrintAllergics],
    imports:[],
    exports:[ThaiDatePipe,ThaiDateTimePipe,ThaiTime,CodeYear,PrintAllergics]
})
export class PipeModele{}