import {Component, Input, OnInit} from '@angular/core';
import {DiaryService} from '../../../services/diary/diary.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Diary} from '../../../models/Diary';
import {Tag} from '../../../models/Tag';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-diary-card',
  templateUrl: './diary-card.component.html',
  styleUrls: ['./diary-card.component.scss']
})
export class DiaryCardComponent implements OnInit {

  diary: Diary;
  diaryToShare: Diary;
  announcementShare: string;
  diaries: Diary[];
  tags: Tag[];

  page: number = 0;
  pages: Array<number>;
  shareLink: string;
  shareLinkGroupForm: FormGroup;
  isSubmitted = false;
  announcementWaitWhileSendingEmail: string;

  constructor(private diaryService: DiaryService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getDiaryById();
    this.shareLinkGroupForm = this.formBuilder.group({
      email: ['', [Validators.email]]
    });
  }

  getDiaryById(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.diaryService.getById(id)
      .subscribe((result) => {
        this.diary = result;
        this.tags = this.diary.tag[''];
      }, error => {
        this.diary = null;
      });
  }

  deleteDiary(): void {
    if (confirm('You want to remove ' + this.diary.title + '?')) {
      this.diaryService.deleteDiary(+this.diary.id)
        .subscribe(res => {
          res.id !== this.diary.id;
        });
      console.log('deleteDiary' + this.diary.status);
      this.loadPage();
    }
  }

  loadPage(): void {
    this.router.navigate(['journals']);
  }

  share(id: string): void {

  }

  getShareLink(id: string): void {
    this.diaryService.getById(+id).subscribe(diaryResult => {
      this.diaryToShare = diaryResult;
      if (this.diaryToShare.status === 2) {
        this.diaryService.getShareLink(id).subscribe(
          result => this.shareLink = 'http://localhost:4200/show-diary?share=' + result.generatedUrl);
      } else {
        this.announcementShare = 'Please change privacy to public';
      }
    });
  }

  shareLinkEmail(id: string): void {
    this.isSubmitted = true;
    this.diaryService.getById(+id).subscribe(result => {
      this.diaryToShare = result;
      if (this.diaryToShare.status === 2) {
        if (this.shareLinkGroupForm.valid) {
          this.announcementWaitWhileSendingEmail = 'Please wait while sending email !';
          this.diaryService.shareDiaryByEmail(this.shareLinkGroupForm.value, id).subscribe(
            () => {
              alert('Email sent to your registered email address');
            }
          );
        }
      } else {
        this.announcementShare = 'Please change privacy to public';
      }
    });
  }
}
