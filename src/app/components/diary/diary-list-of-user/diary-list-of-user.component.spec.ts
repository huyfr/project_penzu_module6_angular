import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryListOfUserComponent } from './diary-list-of-user.component';

describe('DiaryListOfUserComponent', () => {
  let component: DiaryListOfUserComponent;
  let fixture: ComponentFixture<DiaryListOfUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryListOfUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryListOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
