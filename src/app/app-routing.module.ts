import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminShowUserListComponent} from './components/admin/admin-show-user-list.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {UserComponent} from './components/user/user.component';
import {HomeComponent} from './components/home/home.component';
import {NoHaveAccessAnnoucementComponent} from './components/no-have-access-annoucement/no-have-access-annoucement.component';
import {CanActivateTeam} from './auth-guard/can-activate-team';
import {IsAdmin} from './auth-guard/is-admin';
import {AdminMainViewComponent} from './components/admin/admin-main-view/admin-main-view.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'no-access', component: NoHaveAccessAnnoucementComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'journals', component: UserComponent, canActivate: [CanActivateTeam]}, // để show trang user

  {// phục vụ chức năng admin
    path: 'admin/userList',
    component: AdminShowUserListComponent,
    canActivate: [CanActivateTeam, IsAdmin]
  },

  {path: 'admin', component: AdminMainViewComponent},
  {path: 'admin/user/:id', component: AdminShowUserListComponent}, // phục vụ chức năng admin
  {path: 'admin/user/block/:id', component: AdminShowUserListComponent} // phục vụ chức năng admin
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
