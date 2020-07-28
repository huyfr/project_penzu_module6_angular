import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminShowUserListComponent} from './components/admin/admin-show-user-list.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UserComponent} from './components/user/displayUser/user.component';
import {HomeComponent} from './components/home/home.component';
import {NoHaveAccessAnnoucementComponent} from './components/no-have-access-annoucement/no-have-access-annoucement.component';
import {CanActivateTeam} from './auth-guard/can-activate-team';
import {IsAdmin} from './auth-guard/is-admin';
import {ProfileComponent} from './components/user/editUser/profile.component';
import {AdminShowDairyListComponent} from './components/admin/admin-show-dairy-list/admin-show-dairy-list.component';
import {AdminShowAlbumListComponent} from './components/admin/admin-show-album-list/admin-show-album-list.component';
import {AdminShowTagListComponent} from './components/admin/admin-show-tag-list/admin-show-tag-list.component';
import {DiaryCardComponent} from './components/diary/diary-card/diary-card.component';
import {DiaryCreateComponent} from './components/diary/diary-create/diary-create.component';
import {DiaryListOfUserComponent} from './components/diary/diary-list-of-user/diary-list-of-user.component';
import {DiaryShowComponent} from './components/diary/diary-show/diary-show.component';
import {DiaryUpdateComponent} from './components/diary/diary-update/diary-update.component';
import {IsActive} from './auth-guard/is-active';
import {BlockedAnnoucementComponent} from './components/blocked-annoucement/blocked-annoucement.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from './components/recover-password/recover-password.component';
import {ShareDiaryComponent} from './components/share-diary/share-diary.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'no-access', component: NoHaveAccessAnnoucementComponent},
  {path: 'blocked-account', component: BlockedAnnoucementComponent},
  {path: 'login', component: LoginComponent},
  {path: 'show-diary', component: ShareDiaryComponent},
  {path: 'recover-password', component: RecoverPasswordComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'journals', component: UserComponent, canActivate: [CanActivateTeam, IsActive]}, // để show trang user

  {// phục vụ chức năng admin
    path: 'admin/user-list',
    component: AdminShowUserListComponent,
    canActivate: [CanActivateTeam, IsAdmin]
  },
  {// phục vụ chức năng admin
    path: 'admin/dairy-list',
    component: AdminShowDairyListComponent,
    canActivate: [CanActivateTeam, IsAdmin]
  },
  {// phục vụ chức năng admin
    path: 'admin/album-list',
    component: AdminShowAlbumListComponent,
    canActivate: [CanActivateTeam, IsAdmin]
  },
  {// phục vụ chức năng admin
    path: 'admin/tag-list',
    component: AdminShowTagListComponent,
    canActivate: [CanActivateTeam, IsAdmin]
  },
  {path: 'admin/user/:id', component: AdminShowUserListComponent,
    canActivate: [CanActivateTeam, IsAdmin]}, // phục vụ chức năng admin
  {path: 'admin/user/block/:id', component: AdminShowUserListComponent,
    canActivate: [CanActivateTeam, IsAdmin]}, // phục vụ chức năng admin
  {path: 'app/account', component: ProfileComponent, canActivate: [CanActivateTeam, IsActive]},
  {path: 'diary/create', component: DiaryCreateComponent, canActivate: [CanActivateTeam, IsActive]},

  {path: 'diary/listUserDiary', component: DiaryListOfUserComponent, canActivate: [CanActivateTeam, IsActive]},
  {path: 'updateDiary/:id', component: DiaryUpdateComponent, canActivate: [CanActivateTeam, IsActive]},

  {path: 'diaries', component: DiaryShowComponent, canActivate: [CanActivateTeam, IsActive]},
  {path: 'diary/detail/:id', component: DiaryCardComponent, canActivate: [CanActivateTeam, IsActive]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
