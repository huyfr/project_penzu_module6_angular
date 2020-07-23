import { Component, OnInit } from '@angular/core';
import {Diary} from '../../../models/Diary';
import {DiaryService} from '../../../services/diary/diary.service';

@Component({
  selector: 'app-diary-show',
  templateUrl: './diary-show.component.html',
  styleUrls: ['./diary-show.component.scss']
})
export class DiaryShowComponent implements OnInit {
  diary: Diary;
  page: number = 0;
  listDiary: Array<any>;
  pages: Array<number>;

  constructor( private diaryService: DiaryService) { }
  setPage(i, event: any): void{
    event.preventDefault();
    this.page = i;
    this.getAllDiary();
  }

  ngOnInit(): void {
    this.getAllDiary();
  }

  getAllDiary(): void{
    this.diaryService.getAll(this.page).subscribe(
      list => {
        console.log(list);
        this.listDiary = list['content'];
        this.pages = new Array(list['totalPages']);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteDiary(i): void {
    const diary = this.listDiary[i];
    if (confirm('Bạn có muốn xóa ' + diary.title + ' không?')) {
      this.diaryService.deleteDiary(diary.id)
        .subscribe((result) => {
          this.listDiary = this.listDiary.filter(t => t.id !== diary.id);
        });
    }
  }

}
