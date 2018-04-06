import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { IJobTicket } from '../../../models/job-ticket';
import { JobTicketService } from '../../../services/job-ticket.service';
import { Subscription } from 'rxjs/Subscription';

import {FormBuilder, Validators} from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap';
import { IProject } from '../../../models/project';


@Component({
  selector: 'app-sku-list',
  templateUrl: './sku-list.component.html',
  styleUrls: ['./sku-list.component.css']
})
export class SkuListComponent implements OnInit {

  records: IJobTicket[];
  public roterName: string;
  private errorMessage: string;
  private sub: Subscription;
  public record = <IJobTicket>{};
  public totalRecords;
  public listProjects :  string;
  public skip;
  public id;
  @Output() submitClicked: EventEmitter<string> = new EventEmitter();


  constructor(
    private _jobTicketService: JobTicketService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.roterName = this._router.url;
    this.getAll();
    if (this.roterName === "/skulist/new") {
      this.record = <IJobTicket>{};
      this.projectList();
      this.clientsList();
      setTimeout(() => {
        this.showChildModal();
      }, 200);

    }

    this.totalCount();

  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  getAll(): void {
    let queryString: string = JSON.stringify({
      limit: 10,
      skip: this.skip

    });
    this._jobTicketService.all(queryString).subscribe(
      data => {
        this.records = data;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  @ViewChild('childModal') public childModal: ModalDirective;

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this._router.navigate(['/skulist']);
    this.childModal.hide();
  }

  @ViewChild('searchModal') public searchModal: ModalDirective;

  public showSearchModal(): void {
    this.searchModal.show();
  }

  public hideSearchModal(): void {
    this.searchModal.hide();
  }
  // Submit Process
  submitPost() {
    this._jobTicketService.create(this.record).subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.submitClicked.emit();
        this.childModal.hide();
        this._router.navigate(['/skulist', data.id]);
      },
      err => console.log(err)
    );
  }

  showSearchData(param) {

    let queryString: string= JSON.stringify({
      "where": {
        "SkuName":{
          like: encodeURIComponent('%'+param+'%')
        } 
        }
        
    });
    this._jobTicketService.searchByName(queryString).subscribe(
      data =>{
        this.records = data;
      },
      error =>{
        this.errorMessage = error;

      }
    )

  }

  public totalItems: number = 0;
  public currentPage: number = 1;


  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    this.skip = (event.page - 1) * 10;
    this.getAll();
  }

  totalCount() {
    this._jobTicketService.getCount().subscribe(
      data => {
        this.totalItems = <number>data.count;
      },
    );
  }

  projects: IProject[] = [];
  projectList() {
    this._jobTicketService.projectlist().subscribe(
      data => {
        this.projects = data;
        console.log(this.projects);
      },
    );
  }
getProjects(companyname: string): IProject[] {
  console.log(companyname);
  let filteredProjects: IProject[] = [];
  for(let project of this.projects) {
    if(project.CompanyName === companyname) {
      filteredProjects.push(project);
    }
  }
  console.log(filteredProjects); 
  return filteredProjects;
}
  clients: any[];
  clientsList() {
    this._jobTicketService.clientlist().subscribe(
      data => {
        this.clients = data;
        console.log(this.clients);
      },
    );
  }


}
