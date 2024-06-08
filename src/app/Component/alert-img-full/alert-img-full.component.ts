import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  // selector: 'app-alert-img-full',
  templateUrl: './alert-img-full.component.html',
  styleUrls: ['./alert-img-full.component.css']
})
export class AlertImgFullComponent {
  constructor(public dialogRef: MatDialogRef<AlertImgFullComponent>,
    ){}
  closeAlert(){
    this.dialogRef.close()
  }
}
