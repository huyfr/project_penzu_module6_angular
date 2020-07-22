import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserListComponent} from './user/userComponent/user-list/user-list.component';
import {NotActivateTeam} from './auth-guard/not-activate-team';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from "./components/auth/register/register.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user/list', component: UserListComponent},
  {path: 'user/:id', component: UserListComponent},
  {path: 'user/block/:id', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
