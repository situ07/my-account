import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';

import {ContactService} from '../../../services/contact.service';

import {IContact} from '../../../models/contact';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactComponent implements OnInit {

  records : IContact[];
  public roterName: string;
  private errorMessage: string;
  private sub: Subscription;

  constructor(
    private _contatcService : ContactService
  ) { }

  ngOnInit() {
    this.getall();
  }

  getall() : void{
    
        this._contatcService.all().subscribe(
          data => {
            this.records = data;
          },
          error => {
            this.errorMessage = error;
          });
    
    
      }

}
