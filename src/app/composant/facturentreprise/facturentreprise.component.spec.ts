import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturentrepriseComponent } from './facturentreprise.component';

describe('FacturentrepriseComponent', () => {
  let component: FacturentrepriseComponent;
  let fixture: ComponentFixture<FacturentrepriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturentrepriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
