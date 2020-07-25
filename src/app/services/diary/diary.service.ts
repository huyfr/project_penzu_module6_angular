import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Diary} from '../../models/Diary';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Pagination} from '../../models/pagination';
import {FileForm} from '../../models/file-form';

const apiUrl = 'http://localhost:8080/api/sdu';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private sduDiaryUrl = environment.diaryUrl;
  private sduUploadFile = environment.diaryUploadFileUrl;

  constructor(private http: HttpClient) {
  }

  getAllTitle(): Observable<Diary[]> {
    return this.http.get<Diary[]>(apiUrl + '/diary');
  }

  getById(id: number): Observable<Diary> {
    return this.http.get<Diary>(`${apiUrl}/diary/${id}`);
  }

  deleteDiary(id: number): Observable<any> {
    return this.http.delete(`${apiUrl}/dairy/${id}`);
  }

  getAll(page: number): Observable<Diary[]> {
    return this.http.get<Diary[]>(apiUrl + '?page=' + page);
  }

  getAllByUser(page: number, id: number): Observable<Diary[]> {
    return this.http.get<Diary[]>(`${apiUrl}/diary/user/${id}` + '?page=' + page);
  }

  /*Tuan Code*/

  getListDiaryAndPaginationASC(page: number): Observable<Pagination> {
    return this.http.get<Pagination>(this.sduDiaryUrl + 'pagination/ASC?page=' + page);
  }

  getListDiaryAndPaginationDESC(page: number): Observable<Pagination> {
    return this.http.get<Pagination>(this.sduDiaryUrl + 'pagination/DESC?page=' + page);
  }

  getListDiary(): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.sduDiaryUrl);
  }

  createDiary(diary: Diary): Observable<Diary> {
    return this.http.post<Diary>(this.sduDiaryUrl, diary);
  }

  uploadFile(file: FormData, diaryId: string): Observable<FileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<FileForm>(this.sduUploadFile + diaryId, file, {headers});
  }

  findDiaryById(id: string): Observable<Diary> {
    return this.http.get<Diary>(this.sduDiaryUrl + id);
  }

  deleteDiaryById(id: string): Observable<void> {
    return this.http.delete<void>(this.sduDiaryUrl + id);
  }

  updateDiary(diary: Diary): Observable<Diary> {
    return this.http.put<Diary>(this.sduDiaryUrl + diary.id, diary);
  }

  // searchDiaryByTitleAndUserID(title: SearchDiaryByTitleAndUserId): Observable<Diary[]> {
  //   return this.http.post<Diary[]>(this.sduDiaryUrl + 'searchBy-Title-And-UserId', title);
  // }
  //
  // searchDiaryByTitle(title: SearchDiaryByTitle): Observable<Diary[]> {
  //   return this.http.post<Diary[]>(this.sduDiaryUrl + 'search-by-title', title);
  // }
  //
  // searchDiaryByTagAndTitle(searchForm: SearchDiaryByTagAndTitle): Observable<Diary[]> {
  //   return this.http.post<Diary[]>(this.sduDiaryUrl + 'search-by-tag-and-title' , searchForm);
  // }

  searchDiaryByTagId(id: string): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.sduDiaryUrl + 'searchBy-TagId/' + id );
  }
}
