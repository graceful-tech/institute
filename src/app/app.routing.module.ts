import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 

const routes: Routes = [

  {
    path: 'candidate',
    loadChildren: () => import('./features/candidates/candidates.module').then((m) => m.CandidatesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
