import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Diary} from '../../models/Diary';
import {BehaviorSubject, Observable} from 'rxjs';

const apiUrl = 'http://localhost:8080/api/sdu';
@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private httpClient: HttpClient) { }

  getAllTitle(): Observable<Diary[]>{
    return this.httpClient.get<Diary[]>(apiUrl + '/diaries');
  }

  getById(id: number): Observable<Diary>{
    return this.httpClient.get<Diary>(`${apiUrl}/diary/${id}`);
  }

  createDiary(diary: Diary): Observable<Diary>{
    return this.httpClient.post<Diary>(apiUrl + '/create', diary);
  }

  updateDiary(diary: Diary): Observable<Diary>{
    return this.httpClient.put<Diary>(apiUrl + '/edit', diary);
  }

  deleteDiary(id: number): Observable<any>{
    return this.httpClient.delete(`${apiUrl}/delete/${id}`);
  }

  getAll(page: number): Observable<Diary[]>{
    return this.httpClient.get<Diary[]>(apiUrl + '?page=' + page);
  }
}
