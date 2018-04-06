import { Component, OnInit,ViewChild, EventEmitter, Output } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap';

import {IProject} from '../../../models/project';

import {ProjectService} from '../../../services/project.service';

import {JobTicketService} from '../../../services/job-ticket.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  records: IProject[];
  public roterName: string;
  private errorMessage: string;
  public record = <IProject>{};
  public totalRecords;
  public skip;
  public totalItems: number = 0;
  public currentPage: number = 1;
  public id;
  @Output() submitClicked: EventEmitter<string> = new EventEmitter();

  constructor(
    private _projectService: ProjectService,
    private _jobTicketService : JobTicketService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {

    this.roterName = this._router.url;
    console.log(this.roterName);
    this.getAll();
    if (this.roterName === "/projectlist/new") {
      this.record = <IProject>{};
      this.clientsList();
      setTimeout(() => {
        this.showChildModal();
      }, 200);
    }

    this.totalCount();
  }

  getAll(): void {
    let queryString: string = JSON.stringify({
      limit: 10,
      skip: this.skip

    });
    this._projectService.all(queryString).subscribe(
      data => {
        this.records = data;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

    // Submit Process
    submitPost() {
      this._projectService.create(this.record).subscribe(
        data => {
          console.log(JSON.stringify(data));
          this.submitClicked.emit();
          this.childModal.hide();
          this._router.navigate(['/projectlist', data.id]);
        },
        err => console.log(err)
      );
    }

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    this.skip = (event.page - 1) * 10;
    this.getAll();
  }

  totalCount() {
     this._projectService.getCount().subscribe(
       data =>{
         this.totalItems = <number> data.count;
       },
     );
  }

  @ViewChild('childModal') public childModal: ModalDirective;
  
    public showChildModal(): void {
      this.childModal.show();
    }
  
    public hideChildModal(): void {
      this._router.navigate(['/projectlist']);
      this.childModal.hide();
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
