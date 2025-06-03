import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentComponent } from '../candidates/payment/payment.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';

const routes: Routes = [
   {
      path: '',
      component: PaymentDetailsComponent,
    },

    {
      path: 'edit/:id',
      component: EditPaymentComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
