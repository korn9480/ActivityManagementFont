import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule} from '@angular/material/dialog';

const model = [
    MatButtonModule, MatMenuModule, MatIconModule,MatFormFieldModule,MatInputModule,
    MatDatepickerModule,MatFormFieldModule,MatNativeDateModule,MatDialogModule
]
@NgModule({
    declarations:[],
    imports: [model],
    exports:[model],
    providers:[]
})
export class MeterialModule{}


// More than one module matches. Use the '--skip-import' option to skip importing 
// the component into the closest module or use the module option to specify a module