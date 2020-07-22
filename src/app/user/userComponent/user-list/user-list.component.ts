import { Component, OnInit } from '@angular/core';
import {UserService} from '../../userService/user.service';
import {IUser} from '../../../model/User';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: IUser[] = [];

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
