import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebcommandeComponent } from './updatebcommande.component';

describe('UpdatebcommandeComponent', () => {
  let component: UpdatebcommandeComponent;
  let fixture: ComponentFixture<UpdatebcommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatebcommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatebcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
