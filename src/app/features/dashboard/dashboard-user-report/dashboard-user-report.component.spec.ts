import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserReportComponent } from './dashboard-user-report.component';

describe('DashboardUserReportComponent', () => {
  let component: DashboardUserReportComponent;
  let fixture: ComponentFixture<DashboardUserReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUserReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUserReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
