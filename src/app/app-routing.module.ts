import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NotActivateTeam} from './auth-guard/not-activate-team';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from "./components/auth/register/register.component";

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'register', component: RegisterComponent, canActivate: [NotActivateTeam]},
  {path: 'login', component: LoginComponent, canActivate: [NotActivateTeam]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
