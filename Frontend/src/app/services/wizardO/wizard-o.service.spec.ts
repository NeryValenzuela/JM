import { TestBed } from '@angular/core/testing';

import { WizardOService } from './wizard-o.service';

describe('WizardOService', () => {
  let service: WizardOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WizardOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
