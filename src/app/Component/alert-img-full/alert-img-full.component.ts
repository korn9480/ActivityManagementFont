import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-img-full',
  templateUrl: './alert-img-full.component.html',
  styleUrls: ['./alert-img-full.component.css']
})
export class AlertImgFullComponent {
  @Input('is_show') is_display_alert :boolean = false
  closeAlert(){
    this.is_display_alert = false
  }
}
