import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportproformatgeneralComponent } from './rapportproformatgeneral.component';

describe('RapportproformatgeneralComponent', () => {
  let component: RapportproformatgeneralComponent;
  let fixture: ComponentFixture<RapportproformatgeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapportproformatgeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportproformatgeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
