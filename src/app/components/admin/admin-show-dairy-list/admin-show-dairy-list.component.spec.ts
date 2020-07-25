import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowDairyListComponent } from './admin-show-dairy-list.component';

describe('AdminShowDairyListComponent', () => {
  let component: AdminShowDairyListComponent;
  let fixture: ComponentFixture<AdminShowDairyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowDairyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowDairyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
