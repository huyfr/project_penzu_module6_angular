import { Component, OnInit } from '@angular/core';
import {Album} from '../../../models/Album';
import {Image} from '../../../models/Image';
import {FormControl, FormGroup} from '@angular/forms';
import {AlbumService} from '../../../services/album/album.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {ActivatedRoute} from '@angular/router';
import {Tag} from '../../../models/Tag';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {

  albumId: number;
  isShow: boolean;
  topPosToStartShowing = 200;
  tag: Tag;
  album: Album;
  listImage: Image[] = [];
  currentRate = 6;
  p = 1;
  // formCommentCreate = new FormGroup({
  //   contentInput: new FormControl('')
  // });
  // contentUpdate = new FormControl();
  // listComment: Comment[] = [];
  userId: string;
  tokenJWT: string;
  idComment: string;

  constructor(private albumService: AlbumService,
              private token: TokenStorageService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.albumId = params.id;
    });
    this.userId = this.token.getUserId();
    this.tokenJWT = this.token.getToken();
  }

  ngOnInit(): void {
    this.getAlbumById();
    this.getAllImageByAlbumId();

  }

  getAllImageByAlbumId() {
    this.albumService.getListImageByAlbumId(this.albumId)
      .subscribe(
      result => {
        this.listImage = result;
        console.log('listImage ' + this.listImage);
      }
    );
  }

  // getAlbumById() {
  //   this.albumService.getAlbumById(this.albumId)
  //     .subscribe(res => {
  //       this.album = res;
  //       console.log(this.album);
  //     });
  // }

  getAlbumById(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.albumService.getAlbumById(id)
      .subscribe((result) => {
        this.album = result;
        console.log(this.album);
      }, error => {
        this.album = null;
      });
  }
}
