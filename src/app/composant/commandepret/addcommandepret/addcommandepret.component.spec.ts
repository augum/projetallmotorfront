import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcommandepretComponent } from './addcommandepret.component';

describe('AddcommandepretComponent', () => {
  let component: AddcommandepretComponent;
  let fixture: ComponentFixture<AddcommandepretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcommandepretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcommandepretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
