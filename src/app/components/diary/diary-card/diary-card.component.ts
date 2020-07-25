import {Component, Input, OnInit} from '@angular/core';
import {DiaryService} from '../../../services/diary/diary.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Diary} from '../../../models/Diary';
import {Tag} from "../../../models/Tag";


@Component({
  selector: 'app-diary-card',
  templateUrl: './diary-card.component.html',
  styleUrls: ['./diary-card.component.scss']
})
export class DiaryCardComponent implements OnInit {
  diary: Diary;
  diaries: Diary[];
  tags: Tag[];

  // page: number = 0;
  listDiary: Array<any>;
  pages: Array<number>;
  constructor(private diaryService: DiaryService, private activatedRoute: ActivatedRoute, private router: Router) { }

  // setPage(i, event: any): void{
  //   event.preventDefault();
  //   this.page = i;
  //   this.getAllDiary();
  // }

  ngOnInit(): void {
    this.getDiaryById();
    this.getAllDiaries();
    // this.getAllDiary();
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
      this.tags = this.diary.tag[''];
    }, error => {
    });
  }

  deleteDiary(): void {
    const selectedDiary = this.diary;
    if (confirm('You want to remove ' + selectedDiary.title + '?')) {
      this.diaryService.deleteDiary(selectedDiary.id).subscribe( res => {
        res.id !== this.diary.id;
      });
      this.router.navigateByUrl('/diaries');
    }
  }
}
