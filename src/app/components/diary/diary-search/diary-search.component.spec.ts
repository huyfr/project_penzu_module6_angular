import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarySearchComponent } from './diary-search.component';

describe('DiarySearchComponent', () => {
  let component: DiarySearchComponent;
  let fixture: ComponentFixture<DiarySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiarySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
