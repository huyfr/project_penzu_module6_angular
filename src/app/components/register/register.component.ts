import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SignUpInfo} from '../auth/sign-up-info';
import {MustMatch} from '../../util/validate';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  returnUrl: string;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(64)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]),
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
  }

  signUp(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      const {name, username, email, password} = this.registerForm.value;
      const signUpInfoForm = new SignUpInfo(name, username, email, password);

      this.authService.signUp(signUpInfoForm).subscribe(
        data => {
          console.log(data);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          alert('Register Successful !');
          this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          console.log(error);
          this.isSignUpFailed = true;
        }
      );
    }
  }

  get rfc() {
    return this.registerForm.controls;
  }
}
