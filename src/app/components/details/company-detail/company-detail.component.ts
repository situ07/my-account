import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {ICompanies} from '../../../models/companies';
import {IContact} from '../../../models/contact';
import {IPricematrix} from '../../../models/pricematrix';
import {CompaniesService} from '../../../services/companies.service';
import {ContactService} from '../../../services/contact.service';

import { ModalDirective } from 'ngx-bootstrap/modal';



import { AlertModule, AlertService } from 'ngx-alerts';
import { ProgressbarModule } from 'ngx-bootstrap';
import { AccordionModule,BsDatepickerModule } from 'ngx-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyDetailComponent implements OnInit {

  record: ICompanies;
  contacts : IContact[];
  public roterName: string;
  pricematrixes : IPricematrix[];
  JContact = <IContact>{};
  
  records: ICompanies[];
  private sub: Subscription;
  public isValid: boolean;
  isProcessing: boolean = false;

  constructor(
    private _projectService: CompaniesService,
    private _jobTicketService : CompaniesService,
    private _companyService : CompaniesService,
    private _contactService : ContactService,
    private _route: ActivatedRoute,
    private router : Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.roterName = this.router.url;
    console.log ( this.roterName);

    this.sub = this._route.params.subscribe(
      params => {
        let id = params['id'];
        if (!id) {
          this.record = <ICompanies>{};
        }
        else {
          this.getRecord(id);
          this.getContacts(id);
          this.getPriceMatrix(id);
       }

      }

    );

    
  }

  getRecord(id): void {
    this._projectService.getById(id).subscribe(
      data => {
        this.record = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getContacts(id): void {
    this._contactService.getContactByCompanyId(id).subscribe(
      data => {
        this.contacts = data;
    
      },
      error => {
        console.log(error);
      }
    );
  }

  getPriceMatrix(id): void {
    this._companyService.getPricematrixByCompanyId(id).subscribe(
      data => {
        this.pricematrixes = data;
      },
      error => {
        console.log(error);
      }
    );
  }

    // Submit Process
    updateCompany(id) {
      this.isProcessing = true;
  
      setTimeout(() => {
        this._companyService.update(id, this.record).subscribe(
          data => {
            console.log(JSON.stringify(data));
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

    addContact(){
      //this.router.navigate(['/companylist/newContact']);
      this.JContact = <IContact>{};
          setTimeout(() => {
            this.showChildModal();
          }, 200);
    }

    @ViewChild('childModal') public childModal: ModalDirective;

    public showChildModal(): void {
      this.childModal.show();
    }
  
    public hideChildModal(): void {
      this.childModal.hide();
    }

    @ViewChild('priceMatrixModal') public priceMatrixModal: ModalDirective;

    public showChildModalPack(): void {
      this.priceMatrixModal.show();
    }
  
    public hideChildModalPack(): void {
      this.priceMatrixModal.hide();
    }

    addPriceMatrix(){
      setTimeout(() => {
        this.showChildModalPack();
      }, 200);

    }

      // Add Contact Record
    submitPostContact() {
      let temp: ICompanies = Object.assign({}, this.record);
    this.JContact.CompanyName = temp.companyname;
    this.JContact.CompanyID = temp.id;
    this.JContact.type = temp.type;
    this._contactService.create(this.JContact).subscribe(
      data => {
        this.hideChildModal();
        this.contacts.push(data);
      },
      err => console.log(err)
    );
  }


}
