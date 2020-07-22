import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {NotActivateTeam} from './auth-guard/not-activate-team';
import {LoginComponent} from './auth/login/login.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];
const routes: Routes = [
  {path: '**', redirectTo: ''},
  {path: 'register', component: RegisterComponent, canActivate: [NotActivateTeam]},
  {path: 'login', component: LoginComponent, canActivate: [NotActivateTeam]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
