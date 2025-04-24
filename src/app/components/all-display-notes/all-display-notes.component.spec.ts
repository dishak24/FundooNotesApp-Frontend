import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDisplayNotesComponent } from './all-display-notes.component';

describe('AllDisplayNotesComponent', () => {
  let component: AllDisplayNotesComponent;
  let fixture: ComponentFixture<AllDisplayNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDisplayNotesComponent]
    });
    fixture = TestBed.createComponent(AllDisplayNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
