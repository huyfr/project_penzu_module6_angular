import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../services/token-storage.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user/user.service';
import {PassForm} from '../../../services/user/passForm/pass-form';
import {UserForm} from '../../../services/user/userForm/user-form';
import {User} from '../../../models/User';
import {DataSharingService} from '../../../services/dataSharing/data-sharing.service';

const failNothingChange = 'Fail-Nothing Change';
const passwordConfirmNotMatch = 'Password Confirm not Match';
const changePasswordSuccessful = 'Change Password Successful!';
const updatePasswordFail = 'Update Password Fail!';
const pleaseLogin = 'Update Successful. Please Login!';
const fail = 'Fail!';
const LOGIN = '/login';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  info: any;
  user: User;
  filePath: any;
  fileUpload: File;
  inputName = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)])
  });
  returnUrl: string;
  name: any;
  isError = false;
  error = '';
  isErrorUser = false;
  errorUser = '';
  passForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(36)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(36)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(36)])
  });
  processValue = 0;

  constructor(
    private token: TokenStorageService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private dataSharingService: DataSharingService
  ) {
  }

  ngOnInit(): void {
    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getAuthorities(),
      userId: this.token.getUserId(),
      email: this.token.getEmail(),
      avatar: this.token.getAvatar(),
    };
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
    this.userService.getUserById(+this.token.getUserId()).subscribe(user => this.user = user);
    this.authService.svShouldRefresh.subscribe(res => this.getUser().subscribe(user => this.user = user));
  }

  getUser(): any {
      return this.userService.getUserById(+this.token.getUserId());
    }

  updatePassword(closeButton: HTMLInputElement): any{
    const {currentPassword, newPassword, confirmPassword} = this.passForm.value;
    if (newPassword !== confirmPassword) {
      this.isError = true;
      return this.error = passwordConfirmNotMatch;
    }

    const formPass = new PassForm(this.info.userId, this.info.username, currentPassword, newPassword);
    this.authService.updatePassword(formPass).subscribe(
      result => {
        console.log(result);
        closeButton.click();
        this.logout();
        this.router.navigateByUrl(this.returnUrl);
        alert(changePasswordSuccessful);
      }, error1 => {
        this.isError = true;
        this.error = updatePasswordFail;
      }
    );
  }

  updateUser(closeButton: HTMLInputElement): any {
    const {name} = this.inputName.value;

    if (name === '') {
      this.isErrorUser = true;
      return this.errorUser = failNothingChange;
    }
    const userForm = new UserForm(this.info.userId, name);

    this.authService.updateUser(userForm).subscribe(
      result => {
        closeButton.click();
        this.authService.svShouldRefresh.next(true);
      }, error => {
        this.isErrorUser = true;
        return this.errorUser = fail;
      }
    );
  }

  logout(): any {
    this.token.signOut();
    this.router.navigateByUrl(this.returnUrl);
  }

  handleFileChooser(files: FileList): void {
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.filePath = reader.result;
    };
  }

  saveAvatar(openProcessBar: HTMLButtonElement, closeProcess: HTMLButtonElement): any {
    if (this.token) {
      const count = setInterval(() => {
        this.processValue += 10;
        if (this.processValue === 90) {
          this.processValue += 9;
          clearInterval(count);
        }
      }, 1000);
      openProcessBar.click();
      const form = new FormData();
      form.append('file', this.fileUpload);
      this.userService.uploadUserAvatar(form, this.token.getUserId()).subscribe(
        result => {
          clearInterval(count);
          this.processValue = 100;
          this.getUser();
          closeProcess.click();
          this.processValue = 0;
          this.getUser().subscribe( user => {
            this.token.saveAvatar(user.avatar);
            closeProcess.click();
            this.processValue = 0;
          });
        }
      );
    }
  }
}
