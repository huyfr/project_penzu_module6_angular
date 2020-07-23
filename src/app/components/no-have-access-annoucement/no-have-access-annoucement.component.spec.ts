import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoHaveAccessAnnoucementComponent } from './no-have-access-annoucement.component';

describe('NoHaveAccessAnnoucementComponent', () => {
  let component: NoHaveAccessAnnoucementComponent;
  let fixture: ComponentFixture<NoHaveAccessAnnoucementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoHaveAccessAnnoucementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoHaveAccessAnnoucementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
