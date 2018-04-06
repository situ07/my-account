import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {IInvoice} from '../models/invoice';


@Injectable()
export class InvoiceService {

  private _dataUrl: string = "http://localhost:3000/api/invoices";

  constructor(
    private _http: Http
  ) { }

  all(): Observable<IInvoice[]> {
    return this._http.get(this._dataUrl) 
    .map((response: Response) => <IInvoice[]> response.json())

  }

}
