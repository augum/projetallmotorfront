import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcommandepretComponent } from './listcommandepret.component';

describe('ListcommandepretComponent', () => {
  let component: ListcommandepretComponent;
  let fixture: ComponentFixture<ListcommandepretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcommandepretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcommandepretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
