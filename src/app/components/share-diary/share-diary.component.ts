import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Diary} from '../../models/Diary';
import {DiaryService} from '../../services/diary/diary.service';
import {CommentService} from '../../services/comment/comment.service';
import {Comment} from '../../models/Comment';
import {TokenStorageService} from '../../services/token-storage.service';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-share-diary',
  templateUrl: './share-diary.component.html',
  styleUrls: ['./share-diary.component.scss']
})
export class ShareDiaryComponent implements OnInit {
  shareCode: string;
  diaryShare: Diary;
  comment: string;
  comments: Comment[];
  user: User;
  messageLogin: boolean;
  constructor(private activatedRoute: ActivatedRoute,
              private diaryService: DiaryService,
              private commentService: CommentService,
              private tokenStorageService: TokenStorageService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    if (window.sessionStorage.length > 0){
      this.messageLogin = true;
    } else {
      this.messageLogin = false;
    }
    this.activatedRoute.queryParams.subscribe(params => {
          this.shareCode = params.share;
          console.log(this.shareCode);
        });
    this.diaryService.getDiaryByShareURL(this.shareCode).subscribe(result2 => {
      this.diaryShare = result2;
      console.log(this.diaryShare);
      this.getAllCommentByDiaryId(this.diaryShare.id);
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
      this.messageLogin = true;
      if (contentInput === '' || contentInput === null || contentInput === undefined) {
        return;
      }
      this.userService.getUserById(+this.tokenStorageService.getUserId()).subscribe((result) => {
        this.user = result;
        const newComment: Comment = {
          content: contentInput,
          status: 1,
          user: this.user,
          diary: this.diaryShare
        };
        this.commentService.createComment(newComment).subscribe(result => {
          this.comment = '';
          this.getAllCommentByDiaryId(this.diaryShare.id);
          this.router.navigateByUrl('diary/detail/' + this.diaryShare.id);
        });
      }, error => {
        console.log('404');
      });
    }
}
