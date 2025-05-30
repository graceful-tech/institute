import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidateWrapperComponent } from './edit-candidate-wrapper.component';

describe('EditCandidateWrapperComponent', () => {
  let component: EditCandidateWrapperComponent;
  let fixture: ComponentFixture<EditCandidateWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCandidateWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCandidateWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
