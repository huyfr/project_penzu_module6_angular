import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {TokenStorageService} from '../token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthLoginInfo} from '../auth-login-info';

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
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.loginForm =this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]],
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  reloadPage() {
    window.location.reload();
  }

  signIn() {
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

          // console.log(this.token);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.token.getAuthorities();
          this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          console.log(error);
          this.isLoginFailed = true;
        }
      );
    }
   /* const {username, password} = this.loginForm.value;
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

        // console.log(this.token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.token.getAuthorities();
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        console.log(error);
        this.isLoginFailed = true;
      }
    );*/
  }

  get rfc() {
    return this.loginForm.controls;
  }
}