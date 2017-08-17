import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CarouselConfig, CarouselModule } from 'ngx-bootstrap/carousel';


import { ModalModule } from 'ngx-bootstrap';
import { PopoverModule } from 'ngx-bootstrap';
import { AlertModule,AlertService } from 'ngx-alerts';


import { JobTicketService } from './services/job-ticket.service';
import { SharedService } from './services/shared.service';


import { JobTicketRecordService } from './services/job-ticket-record.service';

import { AppComponent } from './app.component';
import { AccDetailsComponent } from './components/details/acc-details/acc-details.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SkuListComponent } from './components/list/sku-list/sku-list.component';
import { HomeComponent } from './components/home/home.component';
import { SkuDetailComponent } from './components/details/sku-detail/sku-detail.component';
import { ProjectListComponent } from './components/list/project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AccDetailsComponent,
    HeaderComponent,
    FooterComponent,
    SkuListComponent,
    HomeComponent,
    SkuDetailComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'skulist/new', component: SkuListComponent },
      { path: 'skulist/:id', component: SkuDetailComponent },
      { path: 'skulist', component: SkuListComponent },
      { path: 'projectlist', component: ProjectListComponent },
      { path: '**', component: HomeComponent },
      { path: '', component: HomeComponent }
    ])
  ],
  providers: [JobTicketService, JobTicketRecordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
