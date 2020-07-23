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
import {AdminShowDairyListComponent} from './components/admin/admin-show-dairy-list/admin-show-dairy-list.component';
import {AdminShowAlbumListComponent} from './components/admin/admin-show-album-list/admin-show-album-list.component';
import {AdminShowTagListComponent} from './components/admin/admin-show-tag-list/admin-show-tag-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'no-access', component: NoHaveAccessAnnoucementComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'journals', component: UserComponent, canActivate: [CanActivateTeam]}, // để show trang user

  {// phục vụ chức năng admin
    path: 'admin/user-list',
    component: AdminShowUserListComponent
    // canActivate: [CanActivateTeam, IsAdmin]
  },
  {// phục vụ chức năng admin
    path: 'admin/dairy-list',
    component: AdminShowDairyListComponent
    // canActivate: [CanActivateTeam, IsAdmin]
  },
  {// phục vụ chức năng admin
    path: 'admin/album-list',
    component: AdminShowAlbumListComponent
    // canActivate: [CanActivateTeam, IsAdmin]
  },
  {// phục vụ chức năng admin
    path: 'admin/tag-list',
    component: AdminShowTagListComponent
    // canActivate: [CanActivateTeam, IsAdmin]
  },
  {path: 'admin/user/:id', component: AdminShowUserListComponent}, // phục vụ chức năng admin
  {path: 'admin/user/block/:id', component: AdminShowUserListComponent} // phục vụ chức năng admin
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
