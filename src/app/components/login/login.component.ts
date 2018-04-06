import { Component, OnInit,ViewChild,EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User;

  constructor(
    private _router : Router,
    private _authService: AuthService
  ) {
   }

  ngOnInit() {
    this.user = <User>{};
    this.user.username = "admin";
    this.user.password = "mindfire";
    setTimeout(() => {
      this.showChildModal();
    }, 200);
  }

  handleLogin(): void {
    if (this._authService.login(this.user)) {
      this._router.navigate(['/skulist']);
    } else {
      alert("Login failed!");
    }
  }


  @ViewChild('childModal') public childModal: ModalDirective;

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
    this._router.navigate(['/home']);
  }
}
