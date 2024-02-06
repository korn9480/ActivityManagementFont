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

const routes: Routes = [
  { path: 'login', component: LoginUserComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'activity-club', component: ActivityClubComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'view-data-activity/:idActivity', component: ViewDataActivytyComponent },
  { path: 'join-activity/:idActivity', component: JoinActivityComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'form-post',component: FormPostActivityComponent},
  { path: 'form-post/:idActivity',component: FormPostActivityComponent},
  { path: 'show-list=admin/:idActivity/:nameActivity',component:ShowListAdminComponent},
  { path: '**',redirectTo:'home'},
  // ViewDataActivity

  // { path: '**', redirectTo:'login'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
