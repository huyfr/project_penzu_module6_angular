import { Component, OnInit } from '@angular/core';
import {DataSharingService} from "../../services/dataSharing/data-sharing.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isUserLoggedIn: boolean;
  username: string;

  constructor(private dataSharingService: DataSharingService,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
    this.dataSharingService.isUserLoggedIn.subscribe(value =>
    {
      this.isUserLoggedIn = value;
      this.username = tokenStorageService.getUsername();
    });
  }

  ngOnInit(): void {
  }

}
