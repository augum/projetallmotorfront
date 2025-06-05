import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLcommandepretComponent } from './list-lcommandepret.component';

describe('ListLcommandepretComponent', () => {
  let component: ListLcommandepretComponent;
  let fixture: ComponentFixture<ListLcommandepretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLcommandepretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLcommandepretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
