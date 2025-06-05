import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListegenarticleComponent } from './listegenarticle.component';

describe('ListegenarticleComponent', () => {
  let component: ListegenarticleComponent;
  let fixture: ComponentFixture<ListegenarticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListegenarticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListegenarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
