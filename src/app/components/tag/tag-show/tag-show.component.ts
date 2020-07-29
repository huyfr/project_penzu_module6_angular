import { Component, OnInit } from '@angular/core';
import {Tag} from "../../../models/Tag";
import {TagService} from "../../../services/tag/tag.service";

@Component({
  selector: 'app-tag-show',
  templateUrl: './tag-show.component.html',
  styleUrls: ['./tag-show.component.scss']
})
export class TagShowComponent implements OnInit {

  tagList: Tag[];

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.getAllTag();
  }

  getAllTag() {
    this.tagService.getTagList().subscribe(
      result => {
        this.tagList = result;
    });
  }

}
