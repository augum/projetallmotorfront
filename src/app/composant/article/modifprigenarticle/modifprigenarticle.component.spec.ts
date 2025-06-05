import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifprigenarticleComponent } from './modifprigenarticle.component';

describe('ModifprigenarticleComponent', () => {
  let component: ModifprigenarticleComponent;
  let fixture: ComponentFixture<ModifprigenarticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifprigenarticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifprigenarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
