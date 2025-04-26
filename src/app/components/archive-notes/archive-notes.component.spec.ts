import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveNotesComponent } from './archive-notes.component';

describe('ArchiveNotesComponent', () => {
  let component: ArchiveNotesComponent;
  let fixture: ComponentFixture<ArchiveNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveNotesComponent]
    });
    fixture = TestBed.createComponent(ArchiveNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
