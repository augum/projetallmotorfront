import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetauxComponent } from './updatetaux.component';

describe('UpdatetauxComponent', () => {
  let component: UpdatetauxComponent;
  let fixture: ComponentFixture<UpdatetauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatetauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatetauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
