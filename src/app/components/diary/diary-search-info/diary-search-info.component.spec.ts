import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarySearchInfoComponent } from './diary-search-info.component';

describe('DiarySearchInfoComponent', () => {
  let component: DiarySearchInfoComponent;
  let fixture: ComponentFixture<DiarySearchInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiarySearchInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarySearchInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
