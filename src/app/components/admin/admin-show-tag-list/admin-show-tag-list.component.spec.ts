import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowTagListComponent } from './admin-show-tag-list.component';

describe('AdminShowTagListComponent', () => {
  let component: AdminShowTagListComponent;
  let fixture: ComponentFixture<AdminShowTagListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowTagListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowTagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
