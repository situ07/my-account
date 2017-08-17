import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IJobTicketRecord } from '../models/job-ticket-record';

@Injectable()
export class JobTicketRecordService {

  private _dataUrl: string = "http://localhost:3000/api/jobTicketTrackers";
  constructor(
    private _http: Http
  ) { }

  create(record: IJobTicketRecord): Observable<IJobTicketRecord> {
       return this._http.post(this._dataUrl, record)
       .map(res =>  res.json())
      .do(response => console.log(JSON.stringify(response)))
     // .catch(this.handleError);    	    
    }

  getById(id: number): Observable<IJobTicketRecord[]> {

    let qry = {where: { jobticketid: id } };
    console.log("qry = " + JSON.stringify(qry));
    return this._http.get(this._dataUrl + "?filter=" + encodeURI(JSON.stringify(qry)))
      .map((response: Response) => <IJobTicketRecord[]>response.json())
      .do(response => console.log("response = " + JSON.stringify(response)));

  }

}
