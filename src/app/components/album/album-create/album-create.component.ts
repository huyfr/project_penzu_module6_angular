import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../../../models/Tag';
import {AlbumService} from '../../../services/album/album.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TagService} from '../../../services/tag/tag.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Album} from '../../../models/Album';


@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.scss']
})
export class AlbumCreateComponent implements OnInit {

  info: any;
  fileUpload: File;
  previewId: number;
  public tagList: Tag[] = [];
  formAlbum = new FormGroup({
    title: new FormControl(''),
    status: new FormControl(''),
    tagId: new FormControl(''),
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
    private albumService: AlbumService,
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
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/albums';
  }

  handleFileChooser(files: FileList): void {
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.filePath = reader.result;
    };
  }

  createAlbum(openModalRef: HTMLButtonElement, openProcessBar: HTMLButtonElement, closeProcess: HTMLButtonElement) {
    const {title, tagId, status} = this.formAlbum.value;

    if (status === '' || title === '' || tagId === '' || this.fileUpload == null) {
      return alert('Fill Data Fields !');
    }

    const count = setInterval(() => {
      this.processValue += 11;
      if (this.processValue === 99) {
        clearInterval(count);
      }
    }, 1000);
    openProcessBar.click();

    const album: Album = {
      title,
      status,
      user: {
        id: this.info.userId
      },
      tag: {
        id: tagId
      }
    };

    this.albumService.createAlbum(album).subscribe(
      result => {
        const form = new FormData();
        form.append('file', this.fileUpload);
        this.albumService.uploadAlbumAvatar(form, result.id).subscribe(
          next => {
            clearInterval(count);
            this.processValue = 100;

            setTimeout(() => {
              closeProcess.click();
              openModalRef.click();
              this.processValue = 0;
              this.previewId = Number(result.id);
              this.formAlbum.reset();
              this.filePath = undefined;
            }, 1000);
          }
        );
      }
    );
  }

  preview(closeModalRef1: HTMLButtonElement) {
    closeModalRef1.click();
    return this.router.navigateByUrl('/album-add-image/'  + this.previewId);
  }
}
