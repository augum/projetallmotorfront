import { TestBed } from '@angular/core/testing';

import { LcommandepretService } from './lcommandepret.service';

describe('LcommandepretService', () => {
  let service: LcommandepretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LcommandepretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
