import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../../models/User";

const apiUrl = 'http://localhost:8080/api/sdu/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  showListUser(): Observable<User[]> {
    return this.http.get<User[]>(apiUrl + 'userList');
  }
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(apiUrl + 'user/' + id);
  }

  blockUser(id: number): Observable<void> {
    return this.http.delete<void>(apiUrl + 'user/block/' + id);
  }

}
