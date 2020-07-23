import {Component, Input, OnInit} from '@angular/core';
import {Diary} from '../../../model/Diary';
import {DiaryService} from '../../../services/diary/diary.service';


@Component({
  selector: 'app-diary-card',
  templateUrl: './diary-card.component.html',
  styleUrls: ['./diary-card.component.scss']
})
export class DiaryCardComponent implements OnInit {

  // @Input() id: 1;
  diary: Diary;
  diaries: Diary[];
  constructor(private diaryService: DiaryService) { }

  ngOnInit(): void {
    this.getDiaryById();
    this.getAllDiaries();
  }

  getAllDiaries(): void{
    this.diaryService.getAllTitle().subscribe((result) => {
      this.diaries = result;
    }, error => {
    });
  }

  getDiaryById(): void {
    this.diaryService.getById(1).subscribe((result) => {
      this.diary = result;
    }, error => {
    });
  }
}
