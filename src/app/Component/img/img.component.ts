import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent {
  @Input() imageUrl!: string;
  imageFull: string = ''
  isLoaded = false;

  onImageLoad() {
    this.isLoaded = true;
  }

  openImageFull(){
    this.imageFull = this.imageUrl
  }

  closeImageFull(){
    this.imageFull = ""
  }
}
