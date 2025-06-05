import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbLcommandeComponent } from './addb-lcommande.component';

describe('AddbLcommandeComponent', () => {
  let component: AddbLcommandeComponent;
  let fixture: ComponentFixture<AddbLcommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbLcommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbLcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
