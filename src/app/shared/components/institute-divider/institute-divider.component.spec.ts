import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteDividerComponent } from './institute-divider.component';

describe('InstituteDividerComponent', () => {
  let component: InstituteDividerComponent;
  let fixture: ComponentFixture<InstituteDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteDividerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
