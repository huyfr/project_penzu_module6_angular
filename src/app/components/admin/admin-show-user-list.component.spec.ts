import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowUserListComponent } from './admin-show-user-list.component';

describe('UserListComponent', () => {
  let component: AdminShowUserListComponent;
  let fixture: ComponentFixture<AdminShowUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
