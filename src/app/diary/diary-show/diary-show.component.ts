import { Component, OnInit } from '@angular/core';
import {DiaryService} from '../services/diary.service';
import {Diary} from '../../model/Diary';

@Component({
  selector: 'app-diary-show',
  templateUrl: './diary-show.component.html',
  styleUrls: ['./diary-show.component.scss']
})
export class DiaryShowComponent implements OnInit {

  constructor(private diaryService: DiaryService) { }
  diaries: Diary[];
  ngOnInit(): void {
    this.getAllDiaries();
  }

  getAllDiaries(): void{
    this.diaryService.getAll().subscribe((result) => {
      console.log(result);
      this.diaries = result;
    }, error => {
    });
  }
}
