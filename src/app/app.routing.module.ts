import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [

   {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'candidates',
    loadChildren: () => import('./features/candidates/candidates.module').then((m) => m.CandidatesModule),
  },

  {
    path: 'view-user',
    loadChildren: () => import('./features/users/users.module').then((m) => m.UsersModule),
  },

  {
    path: 'payment-details',
    loadChildren: () => import('./features/payments/payment.module').then((m) => m.PaymentModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
