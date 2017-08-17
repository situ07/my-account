import { TestBed, inject } from '@angular/core/testing';

import { JobTicketRecordService } from './job-ticket-record.service';

describe('JobTicketRecordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobTicketRecordService]
    });
  });

  it('should be created', inject([JobTicketRecordService], (service: JobTicketRecordService) => {
    expect(service).toBeTruthy();
  }));
});
