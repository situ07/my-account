import { TestBed, inject } from '@angular/core/testing';

import { JobTicketService } from './job-ticket.service';

describe('JobTicketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobTicketService]
    });
  });

  it('should be created', inject([JobTicketService], (service: JobTicketService) => {
    expect(service).toBeTruthy();
  }));
});
