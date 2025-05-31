import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './auth/create-user/create-user.component';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [

  {
    path: 'candidates',
    loadChildren: () => import('./features/candidates/candidates.module').then((m) => m.CandidatesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
