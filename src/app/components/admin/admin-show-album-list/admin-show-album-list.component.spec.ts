import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowAlbumListComponent } from './admin-show-album-list.component';

describe('AdminShowAlbumListComponent', () => {
  let component: AdminShowAlbumListComponent;
  let fixture: ComponentFixture<AdminShowAlbumListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowAlbumListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowAlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
