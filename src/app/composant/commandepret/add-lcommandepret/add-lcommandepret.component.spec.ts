import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLcommandepretComponent } from './add-lcommandepret.component';

describe('AddLcommandepretComponent', () => {
  let component: AddLcommandepretComponent;
  let fixture: ComponentFixture<AddLcommandepretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLcommandepretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLcommandepretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
