import {Component, OnInit} from '@angular/core';
import {DataSharingService} from '../../../services/dataSharing/data-sharing.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {User} from '../../../models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isUserLoggedIn: boolean;
  username: string;
  avatar: string;
  user: User;

  constructor(private dataSharingService: DataSharingService,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
      this.username = this.tokenStorageService.getUsername();
      this.avatar = this.tokenStorageService.getAvatar();
    });
    if (window.sessionStorage.length > 0) {
      this.isUserLoggedIn = true;
      this.username = this.tokenStorageService.getUsername();
      this.avatar = this.tokenStorageService.getAvatar();
    }
  }
}
