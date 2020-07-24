import { Component, OnInit } from '@angular/core';
import {DataSharingService} from "../../../services/dataSharing/data-sharing.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {DiaryService} from "../../../services/diary/diary.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';

@Component({
  selector: 'app-create-diary',
  templateUrl: './create-diary.component.html',
  styleUrls: ['./create-diary.component.scss'],
})
export class CreateDiaryComponent implements OnInit {

  private isUserLoggedIn: boolean;
  public ckEditor = ClassicEditor;
  createForm: FormGroup;
  submitted = false;

  constructor(private dataSharingService: DataSharingService,
              private diaryService: DiaryService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.dataSharingService.isUserLoggedIn.subscribe(value =>
    {
      this.isUserLoggedIn = value;
    });
  }

  ngOnInit(): void {
    if (window.sessionStorage.length > 0) {
      this.isUserLoggedIn = true;
    }
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      user: ['', Validators.required],
      content: ['', Validators.required],
      tag: ['', Validators.required],
      status: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.createForm.valid) {
      const value = this.createForm.getRawValue();
      console.log(value);
      this.diaryService.createDiary(value).subscribe(error => {
        console.log(error)
      });
      this.router.navigateByUrl('/journals');
    }
  }

  get rfc() {
    return this.createForm.controls;
  }
}
