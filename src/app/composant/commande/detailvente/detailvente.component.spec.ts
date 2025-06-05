import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailventeComponent } from './detailvente.component';

describe('DetailventeComponent', () => {
  let component: DetailventeComponent;
  let fixture: ComponentFixture<DetailventeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailventeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailventeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
