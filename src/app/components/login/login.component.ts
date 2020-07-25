import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthLoginInfo} from '../auth/auth-login-info';
import {DataSharingService} from '../../services/dataSharing/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private token: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataSharingService: DataSharingService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(36)]],
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/journals';
  }

  reloadPage(): void {
    window.location.reload();
  }

  signIn(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      const authLoginInfo = new AuthLoginInfo(username, password);

      this.authService.attemptAuth(authLoginInfo).subscribe(
        data => {
          this.token.saveToken(data.accessToken);
          this.token.saveUsername(data.username);
          this.token.saveAuthorities(data.roles);
          this.token.saveUserId(data.id);
          this.token.saveName(data.name);
          this.token.saveEmail(data.email);
          this.token.saveAvatar(data.avatar);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.token.getAuthorities();
          this.router.navigateByUrl(this.returnUrl);
          this.dataSharingService.isUserLoggedIn.next(true);
        },
        error => {
          console.log(error);
          this.isLoginFailed = true;
        }
      );
    }
  }

  get rfc(): any {
    return this.loginForm.controls;
  }
}
