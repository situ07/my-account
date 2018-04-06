import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {IContact} from '../models/contact';

@Injectable()
export class ContactService {


  private _dataUrl: string = "http://localhost:3000/api/contacts";
  
    constructor(
      private _http: Http
    ) { }
  
    all(): Observable<IContact[]> {
      return this._http.get(this._dataUrl) 
      .map((response: Response) => <IContact[]> response.json())
  
    }

    getContactByCompanyId(id: number): Observable<IContact[]> {
      
          let qry = {where: { CompanyID: id } };
          console.log("qry = " + JSON.stringify(qry));
          return this._http.get(this._dataUrl + "?filter=" + encodeURI(JSON.stringify(qry)))
            .map((response: Response) => <IContact[]>response.json())
            .do(response => console.log("response = " + JSON.stringify(response)));
      
        }
        create(record: IContact): Observable<IContact> {
          return this._http.post(this._dataUrl, record)
          .map(res =>  res.json())
         .do(response => console.log(JSON.stringify(response)))
        // .catch(this.handleError);    	    
       }
   


}
