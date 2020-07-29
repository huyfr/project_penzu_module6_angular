import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginService {

  constructor() { }
  login = new Subject<any>();
}
