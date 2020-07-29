import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumByUserComponent } from './album-by-user.component';

describe('AlbumByUserComponent', () => {
  let component: AlbumByUserComponent;
  let fixture: ComponentFixture<AlbumByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
