import {Component, OnInit} from '@angular/core';
import {Diary} from '../../../models/Diary';
import {TokenStorageService} from '../../../services/token-storage.service';
import {UserService} from '../../../services/user/user.service';
import {DiaryService} from '../../../services/diary/diary.service';
import {SearchDiaryByTitleAndUserId} from '../../../models/search-diary-by-title-and-user-id';

@Component({
  selector: 'app-diary-list-of-user',
  templateUrl: './diary-list-of-user.component.html',
  styleUrls: ['./diary-list-of-user.component.scss']
})
export class DiaryListOfUserComponent implements OnInit {
  title: '';
  diaryId: string;
  listDiary: Diary[];

  constructor(
    private token: TokenStorageService,
    private userService: UserService,
    private diaryService: DiaryService
  ) {
  }

  ngOnInit(): void {
    this.getDiaryList();
  }

  getDiaryList(): void {
    this.userService.getDiaryByUser(this.token.getUserId()).subscribe(
      result => {
        this.listDiary = result;
      }
    );
  }

  getDiaryId(id: string): void {
    this.diaryId = id;
  }

  searchByTitle(): void {
    const searchForm: SearchDiaryByTitleAndUserId = {
      title: this.title,
      id: this.token.getUserId()
    };
    this.diaryService.searchDiaryByTitleAndUserID(searchForm).subscribe(
      result => {
        this.listDiary = result;
      }
    );
  }

  deleteDiaryById(closeModalRef: HTMLButtonElement) {

  }
}
