import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Diary} from '../../models/Diary';
import {Observable} from 'rxjs';

const apiUrl = 'http://localhost:8080/api/sdu';
@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Diary[]>{
    return this.httpClient.get<Diary[]>(apiUrl);
  }

  getById(id: number): Observable<Diary>{
    return this.httpClient.get<Diary>(`${apiUrl}/${id}`);
  }

  createDiary(diary: Diary): Observable<Diary>{
    return this.httpClient.post<Diary>(apiUrl, diary);
  }

  updateDiary(diary: Diary): Observable<Diary>{
    return this.httpClient.put<Diary>(apiUrl, diary);
  }

  deleteDiary(id: number): Observable<any>{
    return this.httpClient.delete(`${apiUrl}/${id}`);
  }
}
