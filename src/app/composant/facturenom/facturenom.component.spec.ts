import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturenomComponent } from './facturenom.component';

describe('FacturenomComponent', () => {
  let component: FacturenomComponent;
  let fixture: ComponentFixture<FacturenomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturenomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturenomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
