import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../../models/Tag';

const apiUrl = 'http://localhost:8080/api/sdu';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Tag[]>{
    return this.httpClient.get<Tag[]>(`${apiUrl}/tags`);
  }

  getById(id: number): Observable<Tag>{
    return this.httpClient.get<Tag>(`${apiUrl}/tag/${id}`);
  }

  createTag(tag: Tag): Observable<Tag>{
    return this.httpClient.post<Tag>(`${apiUrl}/create`, tag);
  }

  updateTag(tag: Tag): Observable<Tag>{
    return this.httpClient.put<Tag>(`${apiUrl}/edit`, tag);
  }

  deleteTag(id: number): Observable<any>{
    return this.httpClient.delete(`${apiUrl}/delete/${id}`);
  }
}
