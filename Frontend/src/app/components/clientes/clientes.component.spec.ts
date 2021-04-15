import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLientesComponent } from './clientes.component';

describe('CLientesComponent', () => {
  let component: CLientesComponent;
  let fixture: ComponentFixture<CLientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CLientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CLientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
