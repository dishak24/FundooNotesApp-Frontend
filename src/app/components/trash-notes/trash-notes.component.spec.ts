import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashNotesComponent } from './trash-notes.component';

describe('TrashNotesComponent', () => {
  let component: TrashNotesComponent;
  let fixture: ComponentFixture<TrashNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrashNotesComponent]
    });
    fixture = TestBed.createComponent(TrashNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
