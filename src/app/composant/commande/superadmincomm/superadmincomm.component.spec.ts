import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadmincommComponent } from './superadmincomm.component';

describe('SuperadmincommComponent', () => {
  let component: SuperadmincommComponent;
  let fixture: ComponentFixture<SuperadmincommComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperadmincommComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadmincommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
