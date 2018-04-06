import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CarouselConfig, CarouselModule } from 'ngx-bootstrap/carousel';


import { ModalModule } from 'ngx-bootstrap';
import { SortableModule } from 'ngx-bootstrap';
import { PopoverModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { ProgressbarModule, TabsModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccordionModule } from 'ngx-bootstrap';
import { AlertModule,AlertService } from 'ngx-alerts';



import { JobTicketService } from './services/job-ticket.service';
import {CompaniesService} from './services/companies.service';
import { SharedService } from './services/shared.service';
import {AuthService} from './services/auth.service';


import { JobTicketRecordService } from './services/job-ticket-record.service';
import {ProjectService} from './services/project.service';
import {InvoiceService} from './services/invoice.service';
import {ContactService} from './services/contact.service';
import { AppComponent } from './app.component';
import { AccDetailsComponent } from './components/details/acc-details/acc-details.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SkuListComponent } from './components/list/sku-list/sku-list.component';
import { HomeComponent } from './components/home/home.component';
import { SkuDetailComponent } from './components/details/sku-detail/sku-detail.component';
import { ProjectListComponent } from './components/list/project-list/project-list.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectDetailComponent } from './components/details/project-detail/project-detail.component';
import { InvoiceComponent } from './components/list/invoice/invoice.component';
import { PrintspecComponent } from './components/list/printspec/printspec.component';
import { CompanyListComponent } from './components/list/company-list/company-list.component';
import { ContactComponent } from './components/list/contact/contact.component';
import { CompanyDetailComponent } from './components/details/company-detail/company-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AccDetailsComponent,
    HeaderComponent,
    FooterComponent,
    SkuListComponent,
    HomeComponent,
    SkuDetailComponent,
    ProjectListComponent,
    LoginComponent,
    ProjectDetailComponent,
    InvoiceComponent,
    PrintspecComponent,
    CompanyListComponent,
    ContactComponent,
    CompanyDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
    AccordionModule.forRoot(),
    ProgressbarModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'companylist/new', component: CompanyListComponent },
      { path: 'companylist/newContact', component: CompanyDetailComponent },
      { path: 'login', component: LoginComponent },
      { path: 'skulist/new', component: SkuListComponent },
      { path: 'projectlist/new', component: ProjectListComponent },
      { path: 'skulist/:id', component: SkuDetailComponent },
      { path: 'companylist/:id', component: CompanyDetailComponent },
      { path: 'projectlist/:id', component: ProjectDetailComponent },
      { path: 'skulist', component: SkuListComponent },
      { path: 'contactlist', component: ContactComponent },
      { path: 'companylist', component: CompanyListComponent },
      { path: 'projectlist', component: ProjectListComponent },
      { path: 'invoicelist', component: InvoiceComponent },
      { path: '**', component: HomeComponent },
      { path: '', component: HomeComponent }
    ])
  ],
  providers: [JobTicketService, JobTicketRecordService,AuthService,ProjectService,InvoiceService,CompaniesService,ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
