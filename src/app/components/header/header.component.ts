import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { RouterModule, Routes, Router } from '@angular/router';

import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() myEvent = new EventEmitter();

  public width: Number;
  public roterName: string;
  public activeModule: string;


  constructor(
    public router: Router,
    private _route: SharedService
  ) {
  }

  ngOnInit() {
  }

  openNav(): void {
    this.width = 250;
  }

  closeNav(): void {
    this.width = 0;
  }

  skulist(): void {
    this.width = 0;
    this._route.globalVar = "sku";
    console.log(this._route.globalVar);
    this.router.navigate(['./skulist'])
  }


  invoicelist(): void {
    this.width = 0;
    this._route.globalVar = "invoice";
    console.log(this._route.globalVar);
    this.router.navigate(['./invoicelist'])
  }

  companylist():void{
    this.width = 0;
    this._route.globalVar = "Company";
    this.router.navigate(['./companylist'])
  }

  contactlist():void{
    this.width = 0;
    this._route.globalVar = "Contact";
    this.router.navigate(['./contactlist'])
  }

  projectlist(): void {
    this.width = 0;
    this._route.globalVar = "project";
    console.log(this._route.globalVar);
    this.router.navigate(['./projectlist'])
  }

  add(): void {
    this.width = 0;
    if (this._route.globalVar === "sku") {
      this.router.navigate(['./skulist/new'])
    }
    if (this._route.globalVar === "project") {
      this.router.navigate(['./projectlist/new'])
    }

    if (this._route.globalVar === "Company") {
      this.router.navigate(['./companylist/new'])
    }
  }

  listdetail(): void {
    this.width = 0;
    if (this._route.globalVar === "sku") {
      this.router.navigate(['./skulist/:id'])
    }
    if (this._route.globalVar === "project") {
      this.router.navigate(['./projectlist/:id'])
    }

    if (this._route.globalVar === "Company") {
      this.router.navigate(['./companylist/:id'])
    }
  }

  login(): void {
      this.router.navigate(['./login'])
  }

  Home(): void {
    this._route.globalVar = "";
    this.width = 0;
    this.router.navigate(['./home'])

  }

}
