import {Component, Input, OnInit} from '@angular/core';
import {DiaryService} from '../../../services/diary/diary.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Diary} from '../../../models/Diary';
import {Tag} from '../../../models/Tag';
import {TokenStorageService} from '../../../services/token-storage.service';
import {User} from '../../../models/User';
import {CommentService} from '../../../services/comment/comment.service';
import {Comment} from "../../../models/Comment";
import {UserService} from "../../../services/user/user.service";


@Component({
  selector: 'app-diary-card',
  templateUrl: './diary-card.component.html',
  styleUrls: ['./diary-card.component.scss']
})
export class DiaryCardComponent implements OnInit {

  avatar: string;
  diary: Diary;
  diaries: Diary[];
  tags: Tag[];
  user: User;
  comment: string;
  comments: Comment[];

  page: number = 0;
  pages: Array<number>;
  constructor(private diaryService: DiaryService, private activatedRoute: ActivatedRoute, private router: Router,
              private tokenStorageService: TokenStorageService, private commentService: CommentService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getDiaryById();
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

  loadPage(){
    this.router.navigate(['journals']);
  }

  getAllCommentByDiaryId(id): void {
    this.commentService.getAllCommentByDiaryId(id).subscribe( (result) => {
      this.comments = result;
    }, error => {});
  }

  createComments(): void{
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
    }, error => {console.log('404'); });
  }
}
