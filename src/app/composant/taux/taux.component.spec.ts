import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxComponent } from './taux.component';

describe('TauxComponent', () => {
  let component: TauxComponent;
  let fixture: ComponentFixture<TauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
