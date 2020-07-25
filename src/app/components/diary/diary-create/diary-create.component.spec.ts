import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryCreateComponent } from './diary-create.component';

describe('DiaryCreateComponent', () => {
  let component: DiaryCreateComponent;
  let fixture: ComponentFixture<DiaryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
