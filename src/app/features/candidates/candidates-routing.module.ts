import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { EditCandidateWrapperComponent } from './edit-candidate-wrapper/edit-candidate-wrapper.component';
 
 
const routes: Routes = [
  {
    path: '',
    component: CreateCandidateComponent,
  },
  // {
  //   path: 'add',
  //   component: AddCandidateComponent,
  //   canDeactivate: [TestCanDeactivateGuard]
  // },
  {
    path: 'edit/:id',
    component: EditCandidateWrapperComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatesRoutingModule { }
