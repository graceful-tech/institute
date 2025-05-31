import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { EditCandidateWrapperComponent } from './edit-candidate-wrapper/edit-candidate-wrapper.component';
import { ListCandidatesComponent } from './list-candidates/list-candidates.component';
 
 
const routes: Routes = [
  {
    path: '',
    component: ListCandidatesComponent,
  },
  {
    path: 'add',
    component: CreateCandidateComponent,
  },
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
