import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import {IProject} from '../../../models/project';

import {IJobTicket} from '../../../models/job-ticket';

import {ProjectService} from '../../../services/project.service';
import {JobTicketService} from '../../../services/job-ticket.service';
import {ProjectListComponent} from '../../list/project-list/project-list.component';

import { AlertModule, AlertService } from 'ngx-alerts';
import { ProgressbarModule } from 'ngx-bootstrap';
import { AccordionModule,BsDatepickerModule, TabsModule } from 'ngx-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';



@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  record: IProject;
  records: IProject[];
  projects : IProject[];
  skus : IJobTicket[];
  private sub: Subscription;
  private errorMessage: string;
  public currentid: number;
  public isValid: boolean;
  isProcessing: boolean = false;
  public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };


  constructor(

    private _projectService: ProjectService,
    private _jobTicketService : JobTicketService,
    private _route: ActivatedRoute,
    private router : Router,
    private alertService: AlertService

  ) { }

  ngOnInit() {

    this.sub = this._route.params.subscribe(
      params => {
        let id = params['id'];
        if (!id) {
          this.record = <IProject>{};
        }
        else {
          this.getRecord(id);
          this.getAll();
          this.getSkus(id);
          this.clientsList();
          this.supplierList();
          this.printerList();
       }

      }

    );
  }

  getAll(): void {
    this._projectService.allData().subscribe(
      data => {
        this.projects = data;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  // Submit Process
  updateProject(id) {
    if (!this.isValidForm()) {
      return;
    }
    this.isProcessing = true;

    setTimeout(() => {
      this._projectService.update(id, this.record).subscribe(
        data => {
          console.log(JSON.stringify(data));
          this.status = "success";
          this.isProcessing = false;
          this.alertService.success('Data has been succussfully updated!');
        },
        err => {
          console.log(err)
          this.isProcessing = false;
        }
      );
    }, 1000);

  }
  isValidForm() {
    return this.isValid;
  }

  getRecord(id): void {
    this._projectService.getById(id).subscribe(
      data => {
        this.currentid = id;
        this.isValid = true;
        this.record = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getSkus(id): void {
    this._jobTicketService.getByProjId(id).subscribe(
      data => {
        this.skus = data;
      },
      error => {
        console.log(error);
      }
    );
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

  suppliers: any[];
  supplierList() {
    this._jobTicketService.supplierlist().subscribe(
      data => {
        this.suppliers = data;
      },
    );
  }

  printers: any[];
  printerList() {
    this._jobTicketService.printerlist().subscribe(
      data => {
        this.printers = data;
      },
    );
  }

}
