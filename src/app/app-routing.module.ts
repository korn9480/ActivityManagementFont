import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from 'src/app/page/login-user/login-user.component';
import { ForgotPasswordComponent } from 'src/app/page/forgot-password/forgot-password.component';
import { RegisterUserComponent } from 'src/app/page/register-user/register-user.component';
import { HomeComponent } from 'src/app/page/home/home.component';
import { ActivityClubComponent } from 'src/app/page/activity-club/activity-club.component';
import { CalendarComponent } from 'src/app/page/calendar/calendar.component';
import { ViewDataActivytyComponent } from 'src/app/page/view-data-activyty/view-data-activyty.component';
import { JoinActivityComponent } from 'src/app/page/join-activity/join-activity.component';
import { ProfileComponent } from 'src/app/page/profile/profile.component';
import { FormPostActivityComponent } from 'src/app/page/form-post-activity/form-post-activity.component';
import { ShowListAdminComponent } from 'src/app/page/show-list-admin/show-list-admin.component';
import { GuardPage, GuardPageProfile } from './service/guards/guard';
import { ClubProfileComponent } from './page/club-profile/club-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginUserComponent},
  { path: 'register', component: RegisterUserComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent, canActivate:[GuardPage]},
  { path: 'activity-club', component: ActivityClubComponent,canActivate:[GuardPage] },
  { path: 'calendar', component: CalendarComponent,canActivate:[GuardPage] },
  { path: 'view-data-activity/:idActivity', component: ViewDataActivytyComponent,canActivate:[GuardPage] },
  { path: 'join-activity/:idActivity', component: JoinActivityComponent,canActivate:[GuardPage]},
  { path: 'profile', component: ProfileComponent,canActivate:[GuardPage,GuardPageProfile] },
  { path: 'c-profile', component: ClubProfileComponent,canActivate:[GuardPage,GuardPageProfile]},
  { path: 'form-post',component: FormPostActivityComponent,canActivate:[GuardPage]},
  { path: 'form-post/:idActivity',component: FormPostActivityComponent,canActivate:[GuardPage]},
  { path: 'show-list=admin/:idActivity/:nameActivity',component:ShowListAdminComponent,canActivate:[GuardPage]},
  { path: '**',redirectTo:'login'},
  // ViewDataActivity

  // { path: '**', redirectTo:'login'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
