import { Component, OnInit } from '@angular/core';
import {DataSharingService} from "../../../services/dataSharing/data-sharing.service";

@Component({
  selector: 'app-create-diary',
  templateUrl: './create-diary.component.html',
  styleUrls: ['./create-diary.component.scss']
})
export class CreateDiaryComponent implements OnInit {

  private isUserLoggedIn: boolean;

  constructor(private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe(value =>
    {
      this.isUserLoggedIn = value;
    });
  }

  ngOnInit(): void {
    if (window.sessionStorage.length > 0) {
      this.isUserLoggedIn = true;
    }
  }

}
