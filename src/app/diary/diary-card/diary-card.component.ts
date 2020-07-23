import {Component, Input, OnInit} from '@angular/core';
import {DiaryService} from "../../services/diary/diary.service";
import {Diary} from "../../models/Diary";

@Component({
  selector: 'app-diary-card',
  templateUrl: './diary-card.component.html',
  styleUrls: ['./diary-card.component.scss']
})
export class DiaryCardComponent implements OnInit {
  constructor(private diaryService: DiaryService) { }
  diary: Diary;

  ngOnInit(): void {
    this.getDiaryById();
  }

  private getDiaryById(): void {
    this.diaryService.getById(1).subscribe((result) => {
      this.diary = result;
    }, error => {
    });
  }
}
