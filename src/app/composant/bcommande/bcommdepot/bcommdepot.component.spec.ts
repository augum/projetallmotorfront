import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcommdepotComponent } from './bcommdepot.component';

describe('BcommdepotComponent', () => {
  let component: BcommdepotComponent;
  let fixture: ComponentFixture<BcommdepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcommdepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcommdepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
