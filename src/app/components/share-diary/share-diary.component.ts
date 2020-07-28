import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Diary} from '../../models/Diary';
import {DiaryService} from '../../services/diary/diary.service';

@Component({
  selector: 'app-share-diary',
  templateUrl: './share-diary.component.html',
  styleUrls: ['./share-diary.component.scss']
})
export class ShareDiaryComponent implements OnInit {
  shareCode: string;
  diaryShare: Diary;

  constructor(private activatedRoute: ActivatedRoute,
              private diaryService: DiaryService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
          this.shareCode = params.share;
          console.log(this.shareCode);
        });
    this.diaryService.getDiaryByShareURL(this.shareCode).subscribe(result2 => {
      this.diaryShare = result2;
      console.log(this.diaryShare);
    });
  }
}
