import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {FileForm} from '../../models/file-form';
import {User} from '../../models/User';
import {Diary} from '../../models/Diary';
import {SearchUserByName} from '../../models/search-user-by-name';
import {ForgotPassword} from '../../models/ForgotPassword';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private sduUserUrl = environment.userUrl;
  private sduUserAvatarUrl = environment.userAvatarUrl;

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(this.sduUserUrl + userId);
  }

  uploadUserAvatar(file: FormData, userId: string): Observable<FileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<FileForm>(this.sduUserAvatarUrl + userId, file, {headers});
  }

  getDiaryByUser(userId: string): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.sduUserUrl + userId + '/diary' );
  }

  getListUser(): Observable<User[]> {
    return this.http.get<User[]>(this.sduUserUrl);
  }

  searchUserByName(user: SearchUserByName): Observable<User[]> {
    return this.http.post<User[]>(this.sduUserUrl + 'search-by-name' , user);
  }

  passwordForgot(forgotPassword: ForgotPassword): Observable<ForgotPassword> {
    return this.http.post<ForgotPassword>(this.sduUserUrl + 'forgot-password', forgotPassword);
  }

  newPassword(user: User, token: string): Observable<User> {
    return this.http.post<User>(this.sduUserUrl + `new-password?token=` + token, user);
  }
}
