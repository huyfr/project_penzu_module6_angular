import { Component, OnInit } from '@angular/core';
import {Diary} from '../../../models/Diary';
import {DiaryService} from '../../../services/diary/diary.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';

@Component({
  selector: 'app-diary-show',
  templateUrl: './diary-show.component.html',
  styleUrls: ['./diary-show.component.scss']
})
export class DiaryShowComponent implements OnInit {
  currentUser: any;
  diary: Diary;
  page: number = 0;
  listDiary: Array<any>;
  pages: Array<number>;

/*  constructor( private diaryService: DiaryService,
               private token: TokenStorageService) {
  }
  setPage(i, event: any){*/
  constructor( private diaryService: DiaryService,
      private router: Router,
      private token: TokenStorageService) { }
  setPage(i, event: any): void{
    event.preventDefault();
    this.page = i;
    this.getAllDiary();
  }

  ngOnInit(): void {
    this.getAllDiary();
  }

  getAllDiary(){
    this.currentUser = this.token.getUserId();
    this.diaryService.getAllByUser(this.page, this.currentUser).subscribe(
      list => {
        console.log(this.currentUser.id);
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
