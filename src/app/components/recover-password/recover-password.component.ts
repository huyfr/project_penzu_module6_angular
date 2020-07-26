import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user/user.service';
import {NotificationService} from '../../services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/User';

const FAIL = 'Có lỗi xảy ra trong quá trình thực hiện';
const SUCCESS = 'Thành công';
const NOTIFICATION = 'Thông báo';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  recoverPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  sub: Subscription;
  isSubmitted = false;

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  recoverPassword() {
    this.isSubmitted = true;
    const user: User = {
      password: this.recoverPasswordForm.value.password,
      confirmPassword: this.recoverPasswordForm.value.confirmPassword
    };
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      const token = params.token;
      this.userService.newPassword(user, token).subscribe(() => {
        this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
        this.router.navigate(['login']);
      }, () => {
        this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
      });
    });
  }

  isCorrectConfirmPassword(password: string, confirmPassword: string) {
    return password === confirmPassword;
  }
}
