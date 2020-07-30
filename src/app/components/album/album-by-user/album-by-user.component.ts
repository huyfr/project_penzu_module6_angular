import { Component, OnInit } from '@angular/core';
import {Album} from '../../../models/Album';
import {AlbumService} from '../../../services/album/album.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Tag} from "../../../models/Tag";
import {User} from "../../../models/User";
import {DataSharingService} from "../../../services/dataSharing/data-sharing.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-album-by-user',
  templateUrl: './album-by-user.component.html',
  styleUrls: ['./album-by-user.component.scss']
})
export class AlbumByUserComponent implements OnInit {

  isUserLoggedIn: boolean;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  user: User;

  albumId: number;
  albumList: Album[] = [];
  tagList: Tag[] = [];
  title = '';
  currentUser: any;
  p = 1;

  constructor(private albumService: AlbumService,
              private token: TokenStorageService,
              private dataSharingService: DataSharingService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    if (window.sessionStorage.length > 0) {
      this.isUserLoggedIn = true;
      this.username = this.token.getUsername();
      this.avatar = this.token.getAvatar();
      this.fullName = this.token.getName();
      this.email = this.token.getEmail();
    }
    this.getListAlbumByUserId();
  }

  getListAlbumByUserId(){
    this.currentUser = this.token.getUserId();
    this.albumService.getAlbumsByUserId(this.currentUser)
      .subscribe(res => {
        this.albumList = res;
        console.log('albumList' + this.albumList);
      });
  }

  getAlbumId(id: number) {
    this.albumId = id;
  }


}
