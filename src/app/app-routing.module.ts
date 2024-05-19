import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HomeComponent } from './home/home.component';
import { ActivityClubComponent } from './activity-club/activity-club.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ViewDataActivytyComponent } from './view-data-activyty/view-data-activyty.component';
import { JoinActivityComponent } from './join-activity/join-activity.component';
import { ProfileComponent } from './profile/profile.component';
import { FormPostActivityComponent } from './form-post-activity/form-post-activity.component';
import { ShowListAdminComponent } from './show-list-admin/show-list-admin.component';
import { GuardPage } from './service/guards/guard';

const routes: Routes = [
  { path: 'login', component: LoginUserComponent},
  { path: 'register', component: RegisterUserComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent, canActivate:[GuardPage]},
  { path: 'activity-club', component: ActivityClubComponent,canActivate:[GuardPage] },
  { path: 'calendar', component: CalendarComponent,canActivate:[GuardPage] },
  { path: 'view-data-activity/:idActivity', component: ViewDataActivytyComponent,canActivate:[GuardPage] },
  { path: 'join-activity/:idActivity', component: JoinActivityComponent,canActivate:[GuardPage]},
  { path: 'profile', component: ProfileComponent,canActivate:[GuardPage] },
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
