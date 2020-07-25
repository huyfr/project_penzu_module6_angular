import {Component, Input, OnInit} from '@angular/core';
import {DiaryService} from '../../../services/diary/diary.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Diary} from "../../../models/Diary";


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

  setPage(i, event: any): void{
    event.preventDefault();
    this.page = i;
    this.getAllDiary();
  }

  ngOnInit(): void {
    this.getDiaryById();
    this.getAllDiaries();
    this.getAllDiary();
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

  deleteDiary(id): void {
    const diary = this.listDiary[id];
    if (confirm('You want to remove ' + diary.title + '?')) {
      this.diaryService.deleteDiary(id)
        .subscribe((result) => {
          this.listDiary = this.listDiary.filter(t => t.id !== diary.id);
        });
      this.router.navigateByUrl('/diaries');
    }
  }
}
