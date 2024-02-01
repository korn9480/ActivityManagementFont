import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ActivityManagement';
  selectedReligion: string = 'buddhism';
  customReligion: string = '';
  code_student: string ='';

  submit() {
    console.log(`Submitted Username: ${this.code_student}`);
  }

}
