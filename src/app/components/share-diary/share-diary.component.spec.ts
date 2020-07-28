import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDiaryComponent } from './share-diary.component';

describe('ShareDiaryComponent', () => {
  let component: ShareDiaryComponent;
  let fixture: ComponentFixture<ShareDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
