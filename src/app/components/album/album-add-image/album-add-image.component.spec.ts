import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumAddImageComponent } from './album-add-image.component';

describe('AlbumAddImageComponent', () => {
  let component: AlbumAddImageComponent;
  let fixture: ComponentFixture<AlbumAddImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumAddImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumAddImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
