import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddblistcommandeComponent } from './addblistcommande.component';

describe('AddblistcommandeComponent', () => {
  let component: AddblistcommandeComponent;
  let fixture: ComponentFixture<AddblistcommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddblistcommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddblistcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
