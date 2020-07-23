import { Component, OnInit } from '@angular/core';
import {DataSharingService} from "../../services/dataSharing/data-sharing.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isUserLoggedIn: boolean;

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
