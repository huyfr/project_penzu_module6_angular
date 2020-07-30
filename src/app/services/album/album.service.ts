import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Album} from '../../models/Album';
import {Image} from '../../models/Image';
import {FileForm} from '../../models/file-form';
import {MultiFileForm} from '../../models/multi-file-form';

const httpOptions: any    = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT',
    'Access-Control-Allow-Origin': '*'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private albumUrl = environment.albumUrl;
  private imageURL = environment.imageUrl;
  private albumUploadAvatar = environment.albumUploadAvatarUrl;
  private albumUploadImage = environment.albumUploadImageUrl;

  constructor(private http: HttpClient) { }

  getAlbumsByUserId(userId: number): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumUrl + '/userId/' + userId);
  }

  getListImageByAlbumId(albumId: number): Observable<Image[]> {
    return this.http.get<Image[]>(this.imageURL + '/albumId/' + albumId);
  }

  getAlbumById(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.albumUrl}/${id}`);
  }

  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.albumUrl , album);
  }

  uploadAlbumAvatar(file: FormData, albumId: number): Observable<FileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<FileForm>(`${this.albumUploadAvatar}/${albumId}`, file, {headers});
  }

  uploadAlbumImage(file: FormData, albumId: number): Observable<MultiFileForm[]> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<MultiFileForm[]>(`${this.albumUploadImage}/${albumId}`, file , {headers});
  }

  updateAlbum(album: Album): Observable<Album> {
    return this.http.put<Album>(this.albumUrl + album.id , album);
  }

  deleteImageById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.imageURL}/${id}`);
  }
}
