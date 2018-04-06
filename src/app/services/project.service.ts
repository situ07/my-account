import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IProject } from '../models/project';

@Injectable()
export class ProjectService {

  private _dataUrl: string = "http://localhost:3000/api/projects";
  constructor(private _http: Http) {
  }


  all(queryString: string): Observable<IProject[]> {
    return this._http.get(this._dataUrl + "?filter=" + queryString)
      .map((response: Response) => <IProject[]>response.json())

  }

  allData(): Observable<IProject[]> {
    return this._http.get(this._dataUrl)
      .map((response: Response) => <IProject[]>response.json())

  }


  getCount(): Observable<any> {
    return this._http.get(this._dataUrl + '/count')
      .map((response: Response) => <any>response.json())
      .do(response => console.log("response = " + JSON.stringify(response)));

  }

  create(record: IProject): Observable<IProject> {
    return this._http.post(this._dataUrl, record)
    .map(res =>  res.json())
   .do(response => console.log(JSON.stringify(response)))
  // .catch(this.handleError);    	    
 }

 update(id: number,record: IProject ) : Observable<IProject> {
  return this._http.put(this._dataUrl + '/' + id, record)
  .map(res =>  res.json())
 .do(response => console.log(JSON.stringify(response)))
// .catch(this.handleError); 

}


  getById(id: number): Observable<IProject> {

    return this._http.get(this._dataUrl + '/' + id)
      .map((response: Response) => <IProject>response.json())

  }
}
