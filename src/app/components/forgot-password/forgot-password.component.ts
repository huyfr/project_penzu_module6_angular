import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('')
  });
  isSubmitted = false;

  constructor(private userService: UserService,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  passwordForgot() {
    this.isSubmitted = true;
    this.userService.passwordForgot(this.forgotPasswordForm.value).subscribe(() => {
      this.forgotPasswordForm.reset();
      this.notificationService.showSuccess('<h5>Thành công! Đăng nhập gmail để kiểm tra thư</h5>', 'Thông báo');
    }, () => {
      this.notificationService.showError('<h5>Nhập sai email</h5>', 'Thông báo');
    });
  }

}
