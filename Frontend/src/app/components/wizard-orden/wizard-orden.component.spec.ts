import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardOrdenComponent } from './wizard-orden.component';

describe('WizardOrdenComponent', () => {
  let component: WizardOrdenComponent;
  let fixture: ComponentFixture<WizardOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WizardOrdenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
