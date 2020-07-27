import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedAnnoucementComponent } from './blocked-annoucement.component';

describe('BlockedAnnoucementComponent', () => {
  let component: BlockedAnnoucementComponent;
  let fixture: ComponentFixture<BlockedAnnoucementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedAnnoucementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedAnnoucementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
