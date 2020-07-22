import {Component, OnInit} from '@angular/core';
import {DataSharingService} from '../../../services/dataSharing/data-sharing.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean;
  name: string;

  constructor(private dataSharingService: DataSharingService,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
    this.dataSharingService.isUserLoggedIn.subscribe(value =>
    {
      this.isUserLoggedIn = value;
      this.name = tokenStorageService.getName();
    });
  }

  ngOnInit(): void {
  }

  logout(): void {
    window.sessionStorage.clear();
    this.isUserLoggedIn = false;
    this.router.navigateByUrl('/');
  }
}
