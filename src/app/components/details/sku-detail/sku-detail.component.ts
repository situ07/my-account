import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IJobTicket } from '../../../models/job-ticket';
import { IJobTicketRecord } from '../../../models/job-ticket-record';

import { JobTicketRecordService } from '../../../services/job-ticket-record.service'

import { PopoverModule } from 'ngx-bootstrap';

import { AlertModule, AlertService } from 'ngx-alerts';
import { ProgressbarModule } from 'ngx-bootstrap';
import { AccordionModule,BsDatepickerModule } from 'ngx-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { RouterModule, Routes } from '@angular/router';

import { JobTicketService } from '../../../services/job-ticket.service';

@Component({
  selector: 'app-sku-detail',
  templateUrl: './sku-detail.component.html',
  styleUrls: ['./sku-detail.component.css']
})
export class SkuDetailComponent implements OnInit {

  record: IJobTicket;
  jrecords: IJobTicketRecord[];
  private errorMessage: string;
  private sub: Subscription;
  public skustatus: string;
  public isValid: boolean;
  public jrecord = <IJobTicketRecord>{};
  isProcessing: boolean = false;
  public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  public customClass: string = 'customClass';
  public isFirstOpen: boolean = true;
  public max: number = 200;
  public showWarning: boolean;
  public dynamic: number;
  public type: string;
  public statusval: number;

  constructor(
    private _jobTicketService: JobTicketService,
    private _jobTicketRecordService: JobTicketRecordService,
    private _route: ActivatedRoute,
    private router : Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {

    this.sub = this._route.params.subscribe(
      params => {
        let id = params['id'];
        if (!id) {
          this.record = <IJobTicket>{};
        }
        else {
          this.getRecord(id);
          this.projectList();
          this.clientsList();
        }

      }

    );
  }

  getRecord(id): void {
    this._jobTicketService.getById(id).subscribe(
      data => {
        this.record = data;
        this.skustatus = "";
        this.isValid = true;
        this.getTrackerRecord(id);
       // this.statusBar();
      },
      error => {
        console.log(error);
      }
    );
  }

  getTrackerRecord(id): void {
    this._jobTicketRecordService.getById(id).subscribe(
      data => {
        this.jrecords = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  // Submit Process
  updateSku(id) {
    if (!this.isValidForm()) {
      return;
    }
    this.isProcessing = true;
    setTimeout(() => {
      this._jobTicketService.update(id, this.record).subscribe(
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
    }, 500);

  }
  isValidForm() {
    return this.isValid;
  }

  // Add Tracker Record
  addTracker() {
    this._jobTicketRecordService.create(this.jrecord).subscribe(
      data => {
      },
      err => console.log(err)
    );
  }

  sendToBrief(): void {
    this.record.Status = "A1 Artwork in Progress";
    //this.updateSku(this.record.id);
    this.jrecord.generalComment = "Artwork Briefed to Studio";
    this.jrecord.coreProcess = "Project";
    this.jrecord.processAction = "Artwork";
    this.jrecord.jobticketid = this.record.id;
    this.addTracker();
    this.updateSku(this.record.id)
    this.getTrackerRecord(this.record.id)
  }

  artworkBuild(): void {
    this.record.Status = "A1 Artwork in QC";
    //this.updateSku(this.record.id);
    this.jrecord.generalComment = "Artwork Built";
    this.jrecord.coreProcess = "Project";
    this.jrecord.processAction = "Artwork";
    this.jrecord.jobticketid = this.record.id;
    this.addTracker();
    this.updateSku(this.record.id)
    this.getTrackerRecord(this.record.id)
  }

  sentForApproval(): void {
    this.record.Status = "On Approval";
    //this.updateSku(this.record.id);
    this.jrecord.generalComment = "Sent for Approval";
    this.jrecord.coreProcess = "Project";
    this.jrecord.processAction = "Artwork";
    this.jrecord.jobticketid = this.record.id;
    this.addTracker();
    this.updateSku(this.record.id)
    this.getTrackerRecord(this.record.id)
  }

  amendsInArtwork(): void {
    this.record.Status = "Amends in Artwork";
    this.jrecord.generalComment = "Amends in Artwork";
    this.jrecord.coreProcess = "Project";
    this.jrecord.processAction = "Artwork";
    this.jrecord.jobticketid = this.record.id;
    this.addTracker();
    this.updateSku(this.record.id)
    this.getTrackerRecord(this.record.id)
  }

  approved(): void {
    this.record.Status = "Prepress in Progress";
    this.jrecord.generalComment = "Approved by Shitanshu";
    this.jrecord.coreProcess = "Project";
    this.jrecord.processAction = "Artwork";
    this.jrecord.jobticketid = this.record.id;
    this.addTracker();
    this.updateSku(this.record.id)
    this.getTrackerRecord(this.record.id)
  }

  public statusBar(): void {
    switch(this.record.Status) { 
      case "A1 Artwork in Progress": { 
         this.statusval = 25; 
         break; 
      } 
      case "A1 Artwork in QC": { 
         this.statusval = 50; 
         break; 
      } 
      default: { 
        this.statusval= 100;
         break; 
      } 
   } 
    let type: string;
 
    if (this.statusval === 25) {
      type = 'In Progress';
    } else if (this.statusval === 50) {
      type = 'On Approval';
    } else if (this.statusval === 75) {
      type = 'Approved';
    } else {
      type = 'On Hold';
    }
 
    this.dynamic = this.statusval;
    this.type = type;
  
  }

  colorTheme = 'theme-green';
  
   bsConfig: Partial<BsDatepickerConfig>;
  
   applyTheme(pop: any) {
     // create new object on each property change
     // so Angular can catch object reference change
     this.bsConfig = Object.assign({}, {containerClass: this.colorTheme});
     setTimeout(() => {
       pop.show();
     });
   }

   projects: any[];
   projectList() {
     this._jobTicketService.projectlist().subscribe(
       data => {
         this.projects = data;
         console.log(this.projects);
       },
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


}
