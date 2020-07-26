import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {browser} from 'protractor';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  isSubmitted = false;
  message: string;

  constructor(private userService: UserService,
              private router: Router,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  passwordForgot(): void {
    this.isSubmitted = true;
    if (this.forgotPasswordForm.valid) {
      this.message = 'Please wait while sending email to reset';
      this.userService.passwordForgot(this.forgotPasswordForm.value).subscribe(() => {
        this.forgotPasswordForm.reset();
        alert('An email was sent to your registered email address\nPlease check and follow the guidance');
      }, (error) => {
        if (error.status === 404){
          this.message = 'Your email has been not registered. Please check again';
        }
      });
    }
  }
}
