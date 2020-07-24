import {Component, Input, OnInit} from '@angular/core';
import {Diary} from '../../../model/Diary';
import {DiaryService} from '../../../services/diary/diary.service';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-diary-card',
  templateUrl: './diary-card.component.html',
  styleUrls: ['./diary-card.component.scss']
})
export class DiaryCardComponent implements OnInit {

  // @Input() id: 1;
  diary: Diary;
  diaries: Diary[];
  constructor(private diaryService: DiaryService, private activatedRoute: ActivatedRoute) { }

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
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.diaryService.getById(+id).subscribe((result) => {
      this.diary = result;
    }, error => {
    });
  }
}
