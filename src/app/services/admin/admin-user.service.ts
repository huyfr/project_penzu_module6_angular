import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../../models/User';
import {Diary} from '../../models/Diary';
import {AdminReportForm} from '../../models/AdminReportForm';

const apiUrl = 'http://localhost:8080/api/sdu/';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  shouldRefresh = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  showListUser(): Observable<User[]> {
    return this.http.get<User[]>(apiUrl + 'userList');
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(apiUrl + 'admin/user/' + id);
  }

  blockUser(id: number): Observable<void> {
    return this.http.delete<void>(apiUrl + 'admin/user/block/' + id);
  }

  activeUser(id: number): Observable<void> {
    return this.http.delete<void>(apiUrl + 'admin/user/active/' + id);
  }

  getAllUserPagination(page: number): Observable<User[]> {
    return this.http.get<User[]>(apiUrl + 'admin/user-list' + '?page=' + page);
  }

  getUserById(i: number): Observable<User> {
    return this.http.get<User>(apiUrl + 'admin/user/' + i);
  }

  editUser(data: User): Observable<User> {
    return this.http.put<User>(apiUrl + 'admin/edit/' + data.id, data);
  }

  searchByCreateDate(adminReportForm: AdminReportForm): Observable<any>{
    return this.http.post(apiUrl + 'user/search-by-date', adminReportForm);
  }
}
