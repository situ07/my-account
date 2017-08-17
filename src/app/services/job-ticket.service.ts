import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


import { IJobTicket } from '../models/job-ticket';

@Injectable()
export class JobTicketService {

  private _dataUrl: string = "http://localhost:3000/api/JobTickets";
  constructor(
    private _http: Http
  ) { }

  all(): Observable<IJobTicket[]> {
    return this._http.get(this._dataUrl) 
    .map((response: Response) => <IJobTicket[]> response.json())

  }

  getById(id: number) : Observable<IJobTicket> {

    return this._http.get(this._dataUrl + '/' + id)
    .map((response: Response) => <IJobTicket> response.json())

  }

  create(record: IJobTicket): Observable<IJobTicket> {
       return this._http.post(this._dataUrl, record)
       .map(res =>  res.json())
      .do(response => console.log(JSON.stringify(response)))
     // .catch(this.handleError);    	    
    }


  update(id: number,record: IJobTicket ) : Observable<IJobTicket> {
       return this._http.put(this._dataUrl + '/' + id, record)
       .map(res =>  res.json())
      .do(response => console.log(JSON.stringify(response)))
     // .catch(this.handleError); 

  }
}
