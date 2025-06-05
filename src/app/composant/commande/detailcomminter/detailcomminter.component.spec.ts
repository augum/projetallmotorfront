import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcomminterComponent } from './detailcomminter.component';

describe('DetailcomminterComponent', () => {
  let component: DetailcomminterComponent;
  let fixture: ComponentFixture<DetailcomminterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailcomminterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailcomminterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
