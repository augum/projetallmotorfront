import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesuperadminComponent } from './articlesuperadmin.component';

describe('ArticlesuperadminComponent', () => {
  let component: ArticlesuperadminComponent;
  let fixture: ComponentFixture<ArticlesuperadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesuperadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
