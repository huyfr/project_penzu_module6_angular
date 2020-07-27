import {Injectable} from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';


@Injectable()
export class Permissions {
  constructor(private token: TokenStorageService) {
  }

  canActivate(): boolean {
    if (this.token.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    if (this.token.getAuthorities()[0] === 'ROLE_ADMIN') {
      return true;
    } else {
      return false;
    }
  }

  isActived(): boolean {
    if (+this.token.getUserStatus() === 1) {
      return true;
    }else {
      return false;
    }
  }
}
