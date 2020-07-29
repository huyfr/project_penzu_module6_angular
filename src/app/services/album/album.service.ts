import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Album} from '../../models/Album';
import {Image} from '../../models/Image';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private sduAlbumUrl = environment.albumUrl;
  private imageURL = environment.imageUrl;

  constructor(private http: HttpClient) { }

  getAlbumsByUserId(userId: number): Observable<Album[]> {
    return this.http.get<Album[]>(this.sduAlbumUrl + '/userId/' + userId);
  }

  getListImageByAlbumId(albumId: number): Observable<Image[]> {
    return this.http.get<Image[]>(this.imageURL + '/albumId/' + albumId);
  }

  getAlbumById(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.sduAlbumUrl}/${id}`);
  }
}
