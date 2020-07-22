import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from "../../models/User";

@Component({
  selector: 'app-user-list',
  templateUrl: './admin-show-user-list.component.html',
  styleUrls: ['./admin-show-user-list.component.scss']
})
export class AdminShowUserListComponent implements OnInit {
  userList: User[] = [];

  constructor(private usersService: UserService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.usersService.showListUser().subscribe(result => this.userList = result, error => console.log(error));
  }

  deleteUser(): void{
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usersService.deleteUser(+id).subscribe(() => console.log('delete ok'), error => console.log(error));
  }

  blockUser(): void{
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usersService.blockUser(+id).subscribe(() => console.log('block ok'), error => console.log(error));
  }

}
