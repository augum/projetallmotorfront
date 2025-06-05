import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlestockComponent } from './articlestock.component';

describe('ArticlestockComponent', () => {
  let component: ArticlestockComponent;
  let fixture: ComponentFixture<ArticlestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlestockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
