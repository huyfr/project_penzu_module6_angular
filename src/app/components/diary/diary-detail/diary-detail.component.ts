import {Component, HostListener, OnInit} from '@angular/core';
import {Diary} from '../../../models/Diary';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {TokenStorageService} from '../../../services/token-storage.service';
import {DiaryService} from '../../../services/diary/diary.service';

@Component({
  selector: 'app-diary-detail',
  templateUrl: './diary-detail.component.html',
  styleUrls: ['./diary-detail.component.scss']
})
export class DiaryDetailComponent implements OnInit {

  diaryId: string;
  userId: string;
  diary: Diary;
  currentRate = 6;
  isShow: boolean;
  topPosToStartShowing = 200;
  contentUpdate = new FormControl();
  tokenJWT: string;

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private token: TokenStorageService,
              private diaryService: DiaryService,
              private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.diaryId = params.id;
    });

    this.userId = this.token.getUserId();
    this.tokenJWT = this.token.getToken();
  }

  ngOnInit(): void {
    console.log(this.diaryId, this.token.getUserId());
    this.getDiaryById();
    this.gotoTop();
  }

  @HostListener('window:scroll')
  checkScroll(): void {

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;


    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getDiaryById(): void {
    this.diaryService.findDiaryById(this.diaryId).subscribe(
      result => {
        this.diary = result;
      }
    );
  }

}
