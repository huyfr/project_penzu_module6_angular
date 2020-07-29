import { Component, OnInit } from '@angular/core';
import {Diary} from '../../../models/Diary';
import {DiaryService} from '../../../services/diary/diary.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {SearchDiaryByTitle} from '../../../models/search-diary-by-title';

@Component({
  selector: 'app-diary-search',
  templateUrl: './diary-search.component.html',
  styleUrls: ['./diary-search.component.scss']
})
export class DiarySearchComponent implements OnInit {

  searchList: Diary[];
  titleSearch: string;

  constructor(private diaryService: DiaryService) { }

  ngOnInit(): void {
  }

  searchDiary(event){
    this.titleSearch = event.value;
    console.log('search ' + event.value);
    this.diaryService.searchDiaryByTitle(event.value)
      .subscribe(next => {
        this.searchList = next;
      }, error => {
        this.searchList = null;
        console.log(error);
      });
  }

}
