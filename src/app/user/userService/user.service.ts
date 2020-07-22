import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../../model/User';

const apiUrl = 'http://localhost:8080/api/sdu/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  showListUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(apiUrl + 'userList');
  }


}
