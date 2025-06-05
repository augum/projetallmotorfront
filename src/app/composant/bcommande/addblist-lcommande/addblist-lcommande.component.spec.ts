import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddblistLcommandeComponent } from './addblist-lcommande.component';

describe('AddblistLcommandeComponent', () => {
  let component: AddblistLcommandeComponent;
  let fixture: ComponentFixture<AddblistLcommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddblistLcommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddblistLcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
