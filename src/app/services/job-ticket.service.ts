import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


import { IJobTicket } from '../models/job-ticket';
import { IProject } from '../models/project';

@Injectable()
export class JobTicketService {

  private _dataUrl: string = "http://localhost:3000/api/JobTickets";
  private _dataUrlProject: string = "http://localhost:3000/api/projects";
  private _dataUrlCompanies: string = "http://localhost:3000/api/companies";
  constructor(
    private _http: Http
  ) { }

  all(queryString: string): Observable<IJobTicket[]> {
    return this._http.get(this._dataUrl + "?filter=" + queryString) 
    .map((response: Response) => <IJobTicket[]> response.json())

  }

  searchByName(queryString:string) : Observable<IJobTicket[]>{
    console.log(this._dataUrl + "?filter=" + queryString);
    return this._http.get(this._dataUrl + "?filter=" + queryString) 
    .map((response: Response) => <IJobTicket[]> response.json())
  }

  getById(id: number) : Observable<IJobTicket> {

    console.log(this._dataUrl + '/' + id );
    return this._http.get(this._dataUrl + '/' + id)
    .map((response: Response) => <IJobTicket> response.json())

  }

  getCount() : Observable<any> {
    
        return this._http.get(this._dataUrl + '/count')
        .map((response: Response) => <any> response.json())
        .do(response => console.log("response = " + JSON.stringify(response)));
    
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

  getByProjId(id: number): Observable<IJobTicket[]> {
    
        let qry = {where: { projectid: id } };
        console.log("qry = " + JSON.stringify(qry));
        return this._http.get(this._dataUrl + "?filter=" + encodeURI(JSON.stringify(qry)))
          .map((response: Response) => <IJobTicket[]>response.json())
          .do(response => console.log("response = " + JSON.stringify(response)));
    
      }

      projectlist(): Observable<IProject[]> {
        let queryString = {
          fields: {'ProjectName': true, 'CompanyName': true}
        };
        return this._http.get(this._dataUrlProject + "?filter=" + JSON.stringify(queryString)) 
        .map((response: Response) => <IProject[]> response.json())
        .do(response => console.log("response = " + JSON.stringify(response)));
    
      }

      clientlist(): Observable<IJobTicket[]> {
        let queryString = {
          fields: {'companyname': true},
          where: {
            type : "client"
          }
        };
        return this._http.get(this._dataUrlCompanies + "?filter=" + JSON.stringify(queryString)) 
        .map((response: Response) => <IJobTicket[]> response.json())
        .do(response => console.log("response = " + JSON.stringify(response)));
    
      }

      supplierlist(): Observable<IJobTicket[]> {
        let queryString = {
          fields: {'companyname': true},
          where: {
            type : "supplier"
          }
        };
        return this._http.get(this._dataUrlCompanies + "?filter=" + JSON.stringify(queryString)) 
        .map((response: Response) => <IJobTicket[]> response.json())
        .do(response => console.log("response = " + JSON.stringify(response)));
    
      }

      printerlist(): Observable<IJobTicket[]> {
        let queryString = {
          fields: {'companyname': true},
          where: {
            type : "printer"
          }
        };
        return this._http.get(this._dataUrlCompanies + "?filter=" + JSON.stringify(queryString)) 
        .map((response: Response) => <IJobTicket[]> response.json())
        .do(response => console.log("response = " + JSON.stringify(response)));
    
      }
}
