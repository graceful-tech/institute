import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommentWrapperComponent } from './list-comment-wrapper.component';

describe('ListCommentWrapperComponent', () => {
  let component: ListCommentWrapperComponent;
  let fixture: ComponentFixture<ListCommentWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCommentWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCommentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
