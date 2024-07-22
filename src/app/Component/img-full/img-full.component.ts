import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-img-full',
  templateUrl: './img-full.component.html',
  styleUrls: ['./img-full.component.css']
})
export class ImgFullComponent {
  @Input() imageUrl: string = ""
  @Output() output = new EventEmitter()
  closeModal() {
    this.imageUrl = '';
    this.output.emit()
  }

}
