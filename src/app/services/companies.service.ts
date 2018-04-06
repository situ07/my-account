import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {ICompanies} from '../models/companies';
import {IPricematrix} from '../models/pricematrix';

@Injectable()
export class CompaniesService {


  private _dataUrl: string = "http://localhost:3000/api/companies";
  private _dataUrlPriceMatrix: string = "http://localhost:3000/api/pricematrices";
  
    constructor(
      private _http: Http
    ) { }
  
    all(): Observable<ICompanies[]> {
      return this._http.get(this._dataUrl) 
      .map((response: Response) => <ICompanies[]> response.json())
  
    }

    getById(id: number): Observable<ICompanies> {
      
          return this._http.get(this._dataUrl + '/' + id)
            .map((response: Response) => <ICompanies>response.json())
      
        }

        getPricematrixByCompanyId(id: number): Observable<IPricematrix[]> {
      
          let qry = {where: { companyID: id } };
          console.log("qry = " + JSON.stringify(qry));
          return this._http.get(this._dataUrlPriceMatrix + "?filter=" + encodeURI(JSON.stringify(qry)))
            .map((response: Response) => <IPricematrix[]>response.json())
            .do(response => console.log("response = " + JSON.stringify(response)));
      
        }

        create(record: ICompanies): Observable<ICompanies> {
          return this._http.post(this._dataUrl, record)
          .map(res =>  res.json())
         .do(response => console.log(JSON.stringify(response)))
        // .catch(this.handleError);    	    
       }
   
       update(id: number,record: ICompanies ) : Observable<ICompanies> {
        return this._http.put(this._dataUrl + '/' + id, record)
        .map(res =>  res.json())
       .do(response => console.log(JSON.stringify(response)))
      // .catch(this.handleError); 
      
      }

}
