import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {TokenStorageService} from '../../../services/token-storage.service';
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
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)]),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private token: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  reloadPage() {
    window.location.reload();
  }

  signIn() {
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

        console.log(this.token);
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
}
