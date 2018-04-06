import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import {InvoiceService} from '../../../services/invoice.service';
import {IInvoice} from '../../../models/invoice';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap';

import {FormBuilder, Validators, FormGroup} from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InvoiceComponent implements OnInit {

  records : IInvoice[];
  public roterName: string;
  private errorMessage: string;
  private sub: Subscription;
  public record = <IInvoice>{};
  public invoiceAddForm : FormGroup;

  constructor(
    private _invoiceService : InvoiceService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder : FormBuilder
  ) { }

  ngOnInit() {
   this.invoiceAddForm = this._formBuilder.group({
    'invoicename': [null, Validators.required],
    'amount':[null, Validators.required]
   });
    this.getall();
  }

  getall() : void{

    this._invoiceService.all().subscribe(
      data => {
        this.records = data;
      },
      error => {
        this.errorMessage = error;
      });


  }

  @ViewChild('childModal') public childModal: ModalDirective;
  
    public showChildModal(): void {
      this.childModal.show();
    }
  
    public hideChildModal(): void {
      this.childModal.hide();
    }



}
