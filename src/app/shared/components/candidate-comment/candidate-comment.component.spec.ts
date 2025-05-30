import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCommentComponent } from './candidate-comment.component';

describe('CandidateCommentComponent', () => {
  let component: CandidateCommentComponent;
  let fixture: ComponentFixture<CandidateCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
