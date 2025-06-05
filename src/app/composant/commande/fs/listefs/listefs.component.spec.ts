import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListefsComponent } from './listefs.component';

describe('ListefsComponent', () => {
  let component: ListefsComponent;
  let fixture: ComponentFixture<ListefsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListefsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
