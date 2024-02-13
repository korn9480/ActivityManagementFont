import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HomeComponent } from './home/home.component';
// import { CookieService } from 'ngx-cookie-service';
import { ActivityClubComponent } from './activity-club/activity-club.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CardJoinActivityComponent } from './Component/card-join-activity/card-join-activity.component';
import { NewActivityComponent } from './popup/new-activity/new-activity.component';
import { JoinActivityComponent } from './join-activity/join-activity.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { ViewDataActivytyComponent } from './view-data-activyty/view-data-activyty.component';
import { ActivityAdminComponent } from './popup/activity-admin/activity-admin.component';
import { AlertImgFullComponent } from './Component/alert-img-full/alert-img-full.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormPostActivityComponent } from './form-post-activity/form-post-activity.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ThaiDatePipe } from './service/pipes';
import { ConfirmDialogComponent } from './Component/confirm-dialog/confirm-dialog.component';
import { PipeModele } from './service/pipes.modeul';
import { MeterialModule } from './material.module';
import { ShowListAdminComponent } from './show-list-admin/show-list-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    ForgotPasswordComponent,
    RegisterUserComponent,
    HomeComponent,
    ActivityClubComponent,
    CalendarComponent,
    CardJoinActivityComponent,
    NewActivityComponent,
    JoinActivityComponent,
    ProfileComponent,
    NavbarComponent,
    ViewDataActivytyComponent,
    ActivityAdminComponent,
    AlertImgFullComponent,
    FormPostActivityComponent,
    ShowListAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FullCalendarModule ,
    MeterialModule,
    PipeModele,
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
