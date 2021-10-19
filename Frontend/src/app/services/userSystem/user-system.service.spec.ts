import { TestBed } from '@angular/core/testing';
import { UserSystemService } from './user-system.service';

describe('UserSystemService', () => {
  let service: UserSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UserSystemService] });
    service = TestBed.inject(UserSystemService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
