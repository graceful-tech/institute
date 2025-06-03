import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPaymentComponent } from './dashboard-payment.component';

describe('DashboardPaymentComponent', () => {
  let component: DashboardPaymentComponent;
  let fixture: ComponentFixture<DashboardPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
