import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryShowComponent } from './diary-show.component';

describe('DiaryShowComponent', () => {
  let component: DiaryShowComponent;
  let fixture: ComponentFixture<DiaryShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
