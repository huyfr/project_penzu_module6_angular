import { Component, OnInit } from '@angular/core';
import {DiaryService} from '../services/diary.service';

@Component({
  selector: 'app-diary-show',
  templateUrl: './diary-show.component.html',
  styleUrls: ['./diary-show.component.scss']
})
export class DiaryShowComponent implements OnInit {
  private page = 0;
  private listDiary: Array<any>;
  private pages: Array<number>;

  constructor( private diaryService: DiaryService) { }

  ngOnInit(): void {
    this.getAllDiary();
  }

  getAllDiary(){
    this.diaryService.getAll(this.page).subscribe(
      list => {
        console.log(list);
        this.listDiary = list['content'];
        this.pages = new Array(list['totalPage']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
