import {Component, Input, OnInit} from '@angular/core';
import {DiaryService} from '../../../services/diary/diary.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Diary} from '../../../models/Diary';


@Component({
  selector: 'app-diary-card',
  templateUrl: './diary-card.component.html',
  styleUrls: ['./diary-card.component.scss']
})
export class DiaryCardComponent implements OnInit {

  // @Input() id: 1;
  diary: Diary;
  diaries: Diary[];

  page: number = 0;
  listDiary: Array<any>;
  pages: Array<number>;
  constructor(private diaryService: DiaryService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getDiaryById();
    // this.getAllDiaries();
    // this.getAllDiary();
  }

  getDiaryById(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.diaryService.getById(id)
      .subscribe((result) => {
      this.diary = result;
    }, error => {
      this.diary = null;
    });
  }

  deleteDiary(): void {
    if (confirm('You want to remove ' + this.diary.title + '?')) {
      this.diaryService.deleteDiary(this.diary.id)
        .subscribe(res => {
          res.id !== this.diary.id;
        });
      console.log('deleteDiary' + this.diary.status);
      this.loadPage();
    }
  }

  loadPage(){
    this.router.navigate(['journals']);
  }
}
