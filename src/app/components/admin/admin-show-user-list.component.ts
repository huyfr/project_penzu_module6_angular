import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminUserService} from '../../services/admin/admin-user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/User';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../util/validate';
import {SignUpInfo} from '../auth/sign-up-info';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-show-user-list',
  templateUrl: './admin-show-user-list.component.html',
  styleUrls: ['./admin-show-user-list.component.scss']
})
export class AdminShowUserListComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  userList: User[] = [];
  page = 0;
  pages: Array<number>;
  user: User;
  changeText: boolean;
  pickUpUser: User;
  editForm: FormGroup;
  createForm: FormGroup;
  submitted = false;
  isSignedUp = false;
  isSignUpFailed = false;

  constructor(private usersService: AdminUserService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
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

    this.createForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(64)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]),
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });

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
    if (confirm('Do you really want to block ?')) {
      this.usersService.blockUser(i).subscribe(() => {
        console.log('block ok');
        this.getAllUserList();
      }, error => console.log(error));
    }
  }


  activeUser(i: number): void {
    if (confirm('Do you really want to unblock ?')) {
      this.usersService.activeUser(i).subscribe(() => {
        console.log('active ok');
        this.getAllUserList();
      }, error => console.log(error));
    }
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
      data.roles = [{
        id: '3',
        name: 'ROLE_ADMIN'
      }];
    }
    this.usersService.editUser(data)
      .subscribe(() => {
        this.usersService.shouldRefresh.next();
        alert('Cập nhật thành công');
      }, error => console.log(error));
  }

  get rfc() {
    return this.createForm.controls;
  }

  createUser(): void {
    this.submitted = true;
    if (this.createForm.valid) {
      const {name, username, email, password} = this.createForm.value;
      const signUpInfoForm = new SignUpInfo(name, username, email, password);

      this.authService.signUp(signUpInfoForm).subscribe(
        data => {
          console.log(data);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          this.usersService.shouldRefresh.next();
          alert('Register Successful !');
          this.createForm.reset();
        },
        error => {
          console.log(error);
          this.isSignUpFailed = true;
        }
      );
    }
  }
}
