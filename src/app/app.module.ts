import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AdminShowUserListComponent} from './components/admin/admin-show-user-list.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/user/editUser/profile.component';
import {RegisterComponent} from './components/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {Permissions} from './auth-guard/permissions';
import {CanActivateTeam} from './auth-guard/can-activate-team';
import {NotActivateTeam} from './auth-guard/not-activate-team';
import {IsAdmin} from './auth-guard/is-admin';
import {IsActive} from './auth-guard/is-active';
import {HomeComponent} from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserComponent} from './components/user/displayUser/user.component';
import {NoHaveAccessAnnoucementComponent} from './components/no-have-access-annoucement/no-have-access-annoucement.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {AdminShowDairyListComponent} from './components/admin/admin-show-dairy-list/admin-show-dairy-list.component';
import {AdminShowAlbumListComponent} from './components/admin/admin-show-album-list/admin-show-album-list.component';
import {AdminShowTagListComponent} from './components/admin/admin-show-tag-list/admin-show-tag-list.component';
import {DiaryCardComponent} from './components/diary/diary-card/diary-card.component';
import {TagShowComponent} from './components/tag/tag-show/tag-show.component';
import {DiaryShowComponent} from './components/diary/diary-show/diary-show.component';
import {DiaryCreateComponent} from './components/diary/diary-create/diary-create.component';
import {DiaryUpdateComponent} from './components/diary/diary-update/diary-update.component';
import {CKEditorModule} from 'ngx-ckeditor';
import { DiaryListOfUserComponent } from './components/diary/diary-list-of-user/diary-list-of-user.component';
import { BlockedAnnoucementComponent } from './components/blocked-annoucement/blocked-annoucement.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ShareDiaryComponent } from './components/share-diary/share-diary.component';
import { DiaryDetailComponent } from './components/diary/diary-detail/diary-detail.component';
import { SafeHtmlPipe } from './components/diary/diary-detail/safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DiaryShowComponent,
    AdminShowUserListComponent,
    UserComponent,
    NoHaveAccessAnnoucementComponent,
    HeaderComponent,
    FooterComponent,
    AdminShowDairyListComponent,
    AdminShowAlbumListComponent,
    AdminShowTagListComponent,
    TagShowComponent,
    DiaryCardComponent,
    DiaryCreateComponent,
    DiaryUpdateComponent,
    DiaryListOfUserComponent,
    DiaryDetailComponent,
    SafeHtmlPipe,
    DiaryListOfUserComponent,
    BlockedAnnoucementComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    ShareDiaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CKEditorModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [Permissions, CanActivateTeam, NotActivateTeam, IsAdmin, IsActive],
  bootstrap: [AppComponent]
})
export class AppModule {
}
