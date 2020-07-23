import { Component, OnInit } from '@angular/core';
import {DataSharingService} from "../../../services/dataSharing/data-sharing.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isUserLoggedIn: boolean;
  username: string;
  avatar: string;

  constructor(private dataSharingService: DataSharingService,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
    this.dataSharingService.isUserLoggedIn.subscribe(value =>
    {
      this.isUserLoggedIn = value;
      this.username = tokenStorageService.getUsername();
      this.avatar = tokenStorageService.getAvatar();
    });
  }

  ngOnInit(): void {
  }

}
