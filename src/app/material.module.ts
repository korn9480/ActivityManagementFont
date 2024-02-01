import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

const model = [
    MatButtonModule, MatMenuModule, MatIconModule,

]

@NgModule({
    declarations:[],
    imports: [model
    ]
})
export class MeterialModule{}


// More than one module matches. Use the '--skip-import' option to skip importing 
// the component into the closest module or use the module option to specify a module