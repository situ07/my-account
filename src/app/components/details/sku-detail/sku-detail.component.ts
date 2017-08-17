import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IJobTicket } from '../../../models/job-ticket';
import { IJobTicketRecord } from '../../../models/job-ticket-record';

import { JobTicketRecordService } from '../../../services/job-ticket-record.service'

import { AlertModule, AlertService } from 'ngx-alerts';

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
  public status: string;
  public isValid: boolean;
  public jrecord = <IJobTicketRecord>{};
  isProcessing: boolean = false;


  constructor(
    private _jobTicketService: JobTicketService,
    private _jobTicketRecordService: JobTicketRecordService,
    private _route: ActivatedRoute,
    private router : Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.sub = this._route.params.subscribe(
      params => {
        let id = params['id'];
        if (!id) {
          this.record = <IJobTicket>{};
        }
        else {
          this.getRecord(id);
        }

      }

    );
  }

  getRecord(id): void {
    this._jobTicketService.getById(id).subscribe(
      data => {
        this.record = data;
        this.status = "";
        this.isValid = true;
        this.getTrackerRecord(id);
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
    }, 1000);

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
    this.updateSku(this.record.id);
    this.jrecord.generalComment = "Artwork Briefed to Studio";
    this.jrecord.coreProcess = "Project";
    this.jrecord.processAction = "Artwork";
    this.jrecord.jobticketid = this.record.id;
    this.addTracker();
     this.getRecord(this.record.id)
    this.router.navigate(['./skulist'])
  }

  artworkBuild(): void {
    this.record.Status = "A1 Artwork in QC";
    this.updateSku(this.record.id);
    this.jrecord.generalComment = "Artwork Built";
    this.jrecord.coreProcess = "Project";
    this.jrecord.processAction = "Artwork";
    this.jrecord.jobticketid = this.record.id;
    this.addTracker();
    this.getRecord(this.record.id)
  }

  sentForApproval(): void {
    this.record.Status = "On Approval";
    this.updateSku(this.record.id);
    this.jrecord.generalComment = "Sent for Approval";
    this.jrecord.coreProcess = "Project";
    this.jrecord.processAction = "Artwork";
    this.jrecord.jobticketid = this.record.id;
    this.addTracker();
    this.getRecord(this.record.id)
  }

  amendsInArtwork(): void {
    this.record.Status = "Amends in Artwork";
    this.updateSku(this.record.id);
    this.jrecord.generalComment = "Amends in Artwork";
    this.jrecord.coreProcess = "Project";
    this.jrecord.processAction = "Artwork";
    this.jrecord.jobticketid = this.record.id;
    this.addTracker();
    this.getRecord(this.record.id)
  }

  approved(): void {
    this.record.Status = "Prepress in Progress";
    this.updateSku(this.record.id);
    this.jrecord.generalComment = "Approved by Shitanshu";
    this.jrecord.coreProcess = "Project";
    this.jrecord.processAction = "Artwork";
    this.jrecord.jobticketid = this.record.id;
    this.addTracker();
    this.getRecord(this.record.id)
  }


}
