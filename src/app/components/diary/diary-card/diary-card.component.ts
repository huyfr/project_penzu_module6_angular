import {Component, Input, OnInit} from '@angular/core';
import {DiaryService} from '../../../services/diary/diary.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Diary} from '../../../models/Diary';
import {Tag} from '../../../models/Tag';


@Component({
  selector: 'app-diary-card',
  templateUrl: './diary-card.component.html',
  styleUrls: ['./diary-card.component.scss']
})
export class DiaryCardComponent implements OnInit {

  diary: Diary;
  diaries: Diary[];
  tags: Tag[];

  page: number = 0;
  pages: Array<number>;
  shareLink: string;

  constructor(private diaryService: DiaryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getDiaryById();
  }

  getDiaryById(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.diaryService.getById(id)
      .subscribe((result) => {
        this.diary = result;
        this.tags = this.diary.tag[''];
      }, error => {
        this.diary = null;
      });
  }

  deleteDiary(): void {
    if (confirm('You want to remove ' + this.diary.title + '?')) {
      this.diaryService.deleteDiary(+this.diary.id)
        .subscribe(res => {
          res.id !== this.diary.id;
        });
      console.log('deleteDiary' + this.diary.status);
      this.loadPage();
    }
  }

  loadPage() {
    this.router.navigate(['journals']);
  }

  share(id: string): void {

  }

  getShareLink(id: string): void {
    this.diaryService.getShareLink(id).subscribe(result => this.shareLink = 'http://localhost:4200/show-diary?share=' + result.generatedUrl);
  }
}
