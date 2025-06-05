import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLcommandefComponent } from './add-lcommandef.component';

describe('AddLcommandefComponent', () => {
  let component: AddLcommandefComponent;
  let fixture: ComponentFixture<AddLcommandefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLcommandefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLcommandefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
