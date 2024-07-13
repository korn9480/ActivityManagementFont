import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiUser } from "src/app/API/api-user";
import { AlertImgFullComponent } from "src/app/Component/alert-img-full/alert-img-full.component";
import { FormAsset, FormNewActiviy } from "src/app/model/form";
import { ActivityModel } from "src/app/model/model";
import { UserCookie } from "src/app/service/cookie";
import { environment } from "src/environments/environment.development";

@Component({
  selector: "app-up-image-after",
  templateUrl: "./up-image-after.component.html",
  styleUrls: ["./up-image-after.component.css"],
})
export class UpImageAfterComponent implements OnInit {
  urlFiles: any[] = [];
  fileUpload: FormAsset[] = [];
  form!: ActivityModel;
  localhost = environment.localhost_back + "/asset/";
  id_delete: number[] = [];

  constructor(
    private dialog: MatDialog,
    private api: ApiUser,
    private cookie: UserCookie,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id: number = 0;
    this.route.params.forEach((data: any) => {
      id = data.idActivity;
    });
    this.api.get_activity_one(id).subscribe({
      next: (data: ActivityModel) => {
        this.form = data;
        let asset:any = []
        console.log(this.form.asset)
        this.form.asset.forEach((image)=>{
          if (image.type == 2){
            asset.push(image)
          }
        })
        this.form.asset = asset

      },
    });
  }

  closePopup() {
    this.router.navigate(["/my-activity"]);
  }

  uploadImageEvent() {
    if (this.id_delete.length > 0) {
      this.id_delete.forEach((id: any) => {
        this.api.delete_asset(id, this.form.id).subscribe((data: any) => {});
      });
    }
    if (this.fileUpload.length <= 0) {
      this.closePopup();
    } else {
      this.api
        .create_asset_after(this.fileUpload, this.form.id)
        .subscribe((data: any) => {
          this.closePopup();
        });
    }
  }

  onSelectFiles(event: any) {
    let lenghtImg = 0;
    let files = event.target.files;
    if (files.length + this.urlFiles.length + this.form.asset.length > 6) {
      this.alertImageFull().subscribe();
    } else {
      for (let file of event.target.files) {
        this.readURL(file);
        if (lenghtImg >= 4) {
          break;
        }
      }
    }
  }
  readURL(file: any): void {
    if (file) {
      this.fileUpload.push(new FormAsset(file, 2));

      const reader = new FileReader();

      reader.onload = (e) => {
        let url = reader.result;
        this.urlFiles?.push(url);
      };

      reader.readAsDataURL(file);
    }
  }
  removeUrlfile(index: number) {
    this.urlFiles.splice(index, 1);
    this.fileUpload.splice(index, 1);
  }
  removePath(index: number) {
    let x = this.form.asset.splice(index, 1);
    this.id_delete.push(x[0].id);
  }
  alertImageFull() {
    let dialogRef = this.dialog.open(AlertImgFullComponent, {
      backdropClass: "none",
      width: "300px",
      position: {
        top: "0",
      },
      // data:"คุณต้องการยกเลิกการเข้าร่วมกิจกกรมนี้หรือไม่ ?"
    });
    return dialogRef.afterClosed();
  }
}
