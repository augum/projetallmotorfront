import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Addcommande1Component } from './addcommande1.component';

describe('Addcommande1Component', () => {
  let component: Addcommande1Component;
  let fixture: ComponentFixture<Addcommande1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Addcommande1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Addcommande1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
