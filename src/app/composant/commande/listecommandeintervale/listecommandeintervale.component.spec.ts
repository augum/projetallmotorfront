import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListecommandeintervaleComponent } from './listecommandeintervale.component';

describe('ListecommandeintervaleComponent', () => {
  let component: ListecommandeintervaleComponent;
  let fixture: ComponentFixture<ListecommandeintervaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListecommandeintervaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListecommandeintervaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
