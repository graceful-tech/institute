import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardCandidateComponent } from './dashboard-candidate/dashboard-candidate.component';
import { DashboardUserReportComponent } from './dashboard-user-report/dashboard-user-report.component';
import { DashboardCommentsComponent } from './dashboard-comments/dashboard-comments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardPaymentComponent } from './dashboard-payment/dashboard-payment.component';




@NgModule({
  declarations: [
    DashboardCandidateComponent,
    DashboardCommentsComponent,
    DashboardUserReportComponent,
    DashboardComponent,
    DashboardPaymentComponent

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
