import {Component, Input, OnInit} from '@angular/core';
import {DiaryService} from '../../../services/diary/diary.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Diary} from '../../../models/Diary';
import {Tag} from '../../../models/Tag';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../services/token-storage.service';
import {User} from '../../../models/User';
import {CommentService} from '../../../services/comment/comment.service';

import {UserService} from '../../../services/user/user.service';
import {Comment} from '../../../models/Comment';


@Component({
  selector: 'app-diary-card',
  templateUrl: './diary-card.component.html',
  styleUrls: ['./diary-card.component.scss']
})
export class DiaryCardComponent implements OnInit {

  avatar: string;
  announcementShare: string;
  comment: string;
  shareLink: string;
  announcementWaitWhileSendingEmail: string;
  page: number = 0;
  isSubmitted = false;
  diary: Diary;
  diaryToShare: Diary;
  user: User;
  diaries: Diary[];
  tags: Tag[];
  comments: Comment[];
  pages: Array<number>;
  shareLinkGroupForm: FormGroup;

  constructor(private diaryService: DiaryService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private tokenStorageService: TokenStorageService, private commentService: CommentService,
              private userService: UserService) {
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
        this.getAllCommentByDiaryId(this.diary.id);
        this.avatar = this.tokenStorageService.getAvatar();
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

  share(id: string): void {}

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

  getAllCommentByDiaryId(id): void {
    this.commentService.getAllCommentByDiaryId(id).subscribe((result) => {
      this.comments = result;
    }, error => {
    });
  }

  createComments(): void {
    const contentInput = this.comment;
    if (contentInput === '' || contentInput === null || contentInput === undefined) {
      return;
    }
    this.userService.getUserById(+this.tokenStorageService.getUserId()).subscribe((result) => {
      this.user = result;
      const newComment: Comment = {
        content: contentInput,
        status: 1,
        user: this.user,
        diary: this.diary
      };
      console.log(newComment);
      this.commentService.createComment(newComment).subscribe(result => {
        this.comment = '';
        this.getAllCommentByDiaryId(this.diary.id);
        this.router.navigateByUrl('diary/detail/' + this.diary.id);
      });
    }, error => {
      console.log('404');
    });
  }
}
