import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbcommandeComponent } from './addbcommande.component';

describe('AddbcommandeComponent', () => {
  let component: AddbcommandeComponent;
  let fixture: ComponentFixture<AddbcommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbcommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
