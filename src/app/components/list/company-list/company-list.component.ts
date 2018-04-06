import { Component, OnInit, ViewEncapsulation,ViewChild,EventEmitter, Output } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import {CompaniesService} from '../../../services/companies.service';
import {ICompanies} from '../../../models/companies';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap';

import {FormBuilder, Validators, FormGroup} from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyListComponent implements OnInit {

  records : ICompanies[];
  public roterName: string;
  private errorMessage: string;
  private sub: Subscription;
  public record = <ICompanies>{};
  public id;
  @Output() submitClicked: EventEmitter<string> = new EventEmitter();

  constructor(
    private _companyService : CompaniesService ,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.roterName = this._router.url;
    console.log (this.roterName);
    this.getall();
    if (this.roterName === "/companylist/new") {
      console.log ("he");
      this.record = <ICompanies>{};
      setTimeout(() => {
        this.showChildModal();
      }, 200);

    }
    
    
  }

  getall() : void{
    
        this._companyService.all().subscribe(
          data => {
            this.records = data;
          },
          error => {
            this.errorMessage = error;
          });
    
    
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

      submitPost() {
        this._companyService.create(this.record).subscribe(
          data => {
            console.log(JSON.stringify(data));
            this.submitClicked.emit();
            this.childModal.hide();
            this._router.navigate(['/companylist', data.id]);
          },
          err => console.log(err)
        );
      }

}
