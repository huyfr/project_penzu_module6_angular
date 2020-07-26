import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  isSubmitted = false;

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
    if (this.forgotPasswordForm.valid) {
      this.isSubmitted = true;
      this.userService.passwordForgot(this.forgotPasswordForm.value).subscribe(() => {
        this.forgotPasswordForm.reset();
        this.notificationService.showSuccess('<h5>Thành công! Đăng nhập gmail để kiểm tra thư</h5>', 'Thông báo');
      }, () => {
        this.notificationService.showError('<h5>Nhập sai email</h5>', 'Thông báo');
      });
    }
  }
}
