import { Component, OnInit } from '@angular/core';
import {Diary} from '../../../models/Diary';
import {ActivatedRoute, Router} from '@angular/router';
import {DiaryService} from '../../../services/diary/diary.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {SearchDiaryByTitle} from '../../../models/search-diary-by-title';
import {User} from '../../../models/User';
import {DataSharingService} from '../../../services/dataSharing/data-sharing.service';

@Component({
  selector: 'app-diary-search-info',
  templateUrl: './diary-search-info.component.html',
  styleUrls: ['./diary-search-info.component.scss']
})
export class DiarySearchInfoComponent implements OnInit {

  diaryList: Diary[];
  titleSearch: string;
  isUserLoggedIn: boolean;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  user: User;
  p = 1;

  constructor(private route: ActivatedRoute,
              private diaryService: DiaryService,
              private dataSharingService: DataSharingService,
              private router: Router,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    if (window.sessionStorage.length > 0) {
      this.isUserLoggedIn = true;
      this.username = this.tokenStorageService.getUsername();
      this.avatar = this.tokenStorageService.getAvatar();
      this.fullName = this.tokenStorageService.getName();
      this.email = this.tokenStorageService.getEmail();
    }
    this.route.params.subscribe(param => {
      const title = param.title;
      console.log(name);
      this.titleSearch = title;
      this.diaryService.searchDiaryByTitle(title).subscribe(next => {
        this.diaryList = next;
        console.log(this.diaryList);
      }, error => {
        console.log(error);
        this.diaryList = null;
      });
    });
  }
}
