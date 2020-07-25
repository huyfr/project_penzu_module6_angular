import {Component, OnInit} from '@angular/core';
import {AdminUserService} from '../../services/admin/admin-user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-show-user-list',
  templateUrl: './admin-show-user-list.component.html',
  styleUrls: ['./admin-show-user-list.component.scss']
})
export class AdminShowUserListComponent implements OnInit {
  userList: User[] = [];
  page = 0;
  pages: Array<number>;
  user: User;
  changeText: boolean;
  pickUpUser: User;
  editForm: FormGroup;

  constructor(private usersService: AdminUserService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.changeText = false;
  }

  setPage(i, event: any): void {
    event.preventDefault();
    this.page = i;
    this.getAllUserList();
  }


  ngOnInit(): void {
    // this.usersService.showListUser().subscribe(result => this.userList = result, error => console.log(error));
    this.getAllUserList();

    this.editForm = this.formBuilder.group({
        username: ['', [Validators.minLength(3), Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        roles: [''],
      }
    );
    this.usersService.shouldRefresh.subscribe(res => this.getAllUserList());
  }

  private getAllUserList(): void {
    this.usersService.getAllUserPagination(this.page).subscribe(
      list => {
        console.log(list);
        this.userList = list['content'];
        this.pages = new Array(list['totalPages']);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteUser(id: number): void {
    if (confirm('Do you really want to delete this user ?')) {
      this.usersService.deleteUser(id).subscribe(() => this.getAllUserList(), error => console.log(error));
    }
  }

  blockUser(i: number): void {
    this.usersService.blockUser(i).subscribe(() => {
      console.log('block ok');
      this.getAllUserList();
    }, error => console.log(error));
  }


  activeUser(i: number): void {
    this.usersService.activeUser(i).subscribe(() => {
      console.log('active ok');
      this.getAllUserList();
    }, error => console.log(error));
  }

  showDetailUser(id: string): void {
    this.usersService.getUserById(+id).subscribe(result => {
      this.pickUpUser = result;
      console.log(this.pickUpUser);
      this.editForm.patchValue(result);
    });
  }

  changeInfor(closeModalRef: HTMLButtonElement): void {
    console.log(this.editForm.get('roles').value);
    const {value} = this.editForm;

    const data = {
      ...this.pickUpUser,
      ...value
    };

    if (this.editForm.get('roles').value == 1) {
      data.roles = [{
        id: '1',
        name: 'ROLE_USER'
      }];
    } else {
      console.log('admin');
      data.roles = [{
        id: '3',
        name: 'ROLE_ADMIN'
      }];
    }
    console.log(data);
    this.usersService.editUser(data)
      .subscribe(() => {
        this.usersService.shouldRefresh.next();
        alert('Cập nhật thành công');
      }, error => console.log(error));
  }
}
