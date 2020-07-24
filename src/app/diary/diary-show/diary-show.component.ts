import { Component, OnInit } from '@angular/core';
import {DiaryService} from '../../services/diary/diary.service';
import {Diary} from '../../models/Diary';


@Component({
  selector: 'app-diary-show',
  templateUrl: './diary-show.component.html',
  styleUrls: ['./diary-show.component.scss']
})
export class DiaryShowComponent implements OnInit {

  constructor(private diaryService: DiaryService) { }
  // @Input() id: 1;
  diary: Diary;
  diaries: Diary[];
  ngOnInit(): void {
    // this.getAllDiaries();
    this.getDiaryById();
  }

  // getAllDiaries(): void{
  //   this.diaryService.getAll().subscribe((result) => {
  //     this.diaries = result;
  //   }, error => {
  //   });
  // }

  getDiaryById(): void {
    this.diaryService.getById(1).subscribe((result) => {
      this.diary = result;
    }, error => {
    });
  }
}
