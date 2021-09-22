import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAComponent } from './job-a.component';

describe('JobAComponent', () => {
  let component: JobAComponent;
  let fixture: ComponentFixture<JobAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
