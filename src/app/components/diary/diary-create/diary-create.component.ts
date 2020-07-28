import {Component, OnInit} from '@angular/core';
import {Tag} from '../../../models/Tag';
import {FormControl, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../../../services/token-storage.service';
import {DiaryService} from '../../../services/diary/diary.service';
import {TagService} from '../../../services/tag/tag.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Diary} from '../../../models/Diary';


const fillDataFields = 'Fill Data Fields';

@Component({
  selector: 'app-diary-create',
  templateUrl: './diary-create.component.html',
  styleUrls: ['./diary-create.component.scss']
})
export class DiaryCreateComponent implements OnInit {

  info: any;
  fileUpload: File;
  previewId: number;
  public tagList: Tag[] = [];
  formDiary = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    content: new FormControl(''),
    tagId: new FormControl(''),
    status: new FormControl(''),
    file: new FormControl(''),
  });
  returnUrl: string;
  filePath: any;
  processValue = 0;

  privacy = [
    { name: 'Public', value: 2 },
    { name: 'Only me', value: 1 }
  ];

  constructor(
    private token: TokenStorageService,
    private diaryService: DiaryService,
    private tagService: TagService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.tagService.getTagList().subscribe(
      result => {
        this.tagList = result;
      }
    );

    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getAuthorities(),
      userId: this.token.getUserId(),
      email: this.token.getEmail()
    };
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/diary/listUserDiary';
  }

  handleFileChooser(files: FileList): void {
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.filePath = reader.result;
    };
  }

  createDiary(openModalRef: HTMLButtonElement, openProcessBar: HTMLButtonElement, closeProcess: HTMLButtonElement) {
    const {title, description, content, tagId, status} = this.formDiary.value;

    if (title === '' || description === '' || content === '' || tagId === '' || status === '' || this.fileUpload == null) {
      return alert(fillDataFields);
    }

    const count = setInterval(() => {
      this.processValue += 11;
      if (this.processValue === 99) {
        clearInterval(count);
      }
    }, 1000);
    openProcessBar.click();

    const diary: Diary = {
      title,
      description,
      content,
      status,
      user: {
        id: this.info.userId
      },
      tag: {
        id: tagId
      }
    };


    this.diaryService.createDiary(diary).subscribe(
      result => {
        const form = new FormData();
        form.append('file', this.fileUpload);
        this.diaryService.uploadFile(form, String(result.id)).subscribe(
          next => {
            clearInterval(count);
            this.processValue = 100;

            setTimeout(() => {
              closeProcess.click();
              openModalRef.click();
              this.processValue = 0;
              this.previewId = Number(result.id);
              this.formDiary.reset();
              this.filePath = undefined;
            }, 1000);
          }
        );
      }
    );
  }

  preview(closeButton: HTMLInputElement) {
    closeButton.click();
    return this.router.navigateByUrl('/diary/detail/' + this.previewId);
  }
}
