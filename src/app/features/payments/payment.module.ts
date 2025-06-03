import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';

 

@NgModule({
  declarations: [
    PaymentDetailsComponent,
    EditPaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule

  ]
})
export class PaymentModule { }
