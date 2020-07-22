import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CKEditorModule} from 'ngx-ckeditor';
import {NgxPaginationModule} from 'ngx-pagination';
import {Permissions} from './auth-guard/permissions';
import {CanActivateTeam} from './auth-guard/can-activate-team';
import {NotActivateTeam} from './auth-guard/not-activate-team';
import {IsAdmin} from './auth-guard/is-admin';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgxPaginationModule
  ],
  providers: [Permissions, CanActivateTeam, NotActivateTeam , IsAdmin],
  bootstrap: [AppComponent]
})
export class AppModule { }
