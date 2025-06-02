import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'candidates',
    loadChildren: () => import('./features/candidates/candidates.module').then((m) => m.CandidatesModule),
  },

  {
    path: 'view-user',
    loadChildren: () => import('./features/users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
