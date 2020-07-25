import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryUpdateComponent } from './diary-update.component';

describe('DiaryUpdateComponent', () => {
  let component: DiaryUpdateComponent;
  let fixture: ComponentFixture<DiaryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
