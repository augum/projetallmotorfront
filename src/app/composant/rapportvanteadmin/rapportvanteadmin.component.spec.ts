import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportvanteadminComponent } from './rapportvanteadmin.component';

describe('RapportvanteadminComponent', () => {
  let component: RapportvanteadminComponent;
  let fixture: ComponentFixture<RapportvanteadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapportvanteadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportvanteadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
