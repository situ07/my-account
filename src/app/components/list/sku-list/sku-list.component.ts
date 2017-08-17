import { Component, OnInit, ViewChild,EventEmitter, Output } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { IJobTicket } from '../../../models/job-ticket';
import { JobTicketService } from '../../../services/job-ticket.service';
import { Subscription } from 'rxjs/Subscription';

import { ModalDirective } from 'ngx-bootstrap/modal';

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
    console.log(this.roterName);
    this.getAll();
    if (this.roterName === "/skulist/new") {
      this.record = <IJobTicket>{};
      setTimeout(() => {
        this.showChildModal();
      }, 200);

    }

  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  getAll(): void {
    this._jobTicketService.all().subscribe(
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
  // Submit Process
   submitPost()
    {        
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

}
