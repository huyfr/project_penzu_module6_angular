import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserListComponent} from './components/user/userComponent/user-list/user-list.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {UserComponent} from './components/user/user.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'journals', component: UserComponent},
  //Anh Linh sửa
  //start
  {path: 'user/list', component: UserListComponent},
  {path: 'user/:id', component: UserListComponent},
  {path: 'user/block/:id', component: UserListComponent}
  //stop
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
