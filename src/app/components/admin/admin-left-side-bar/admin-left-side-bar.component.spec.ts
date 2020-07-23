import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeftSideBarComponent } from './admin-left-side-bar.component';

describe('AdminLeftSideBarComponent', () => {
  let component: AdminLeftSideBarComponent;
  let fixture: ComponentFixture<AdminLeftSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLeftSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLeftSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
