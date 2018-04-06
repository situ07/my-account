import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../models/user';

@Injectable()
export class AuthService {

  isAuthenticated: boolean = false;



  constructor(
    private _router: Router
  ) { }



  login(user: User): boolean {
    if (user.username == "shitanshu" && user.password === "mindfire") {
      this.isAuthenticated = true;
      return true;
    }
    else {
      this.isAuthenticated = false;
      return false;
    }

  }

  logout(): void {
    this.isAuthenticated = false;
    this._router.navigate(['/login']);
  }

}
