import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesRoutingModule } from './candidates-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { ListCommentWrapperComponent } from './list-comment-wrapper/list-comment-wrapper.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CourceDetailsComponent } from './cource-details/cource-details.component';
import { EditCandidateWrapperComponent } from './edit-candidate-wrapper/edit-candidate-wrapper.component';
 


@NgModule({
  declarations: [
    CreateCandidateComponent,
    ListCommentWrapperComponent,
    AddCommentComponent,
    CourceDetailsComponent,
    EditCandidateWrapperComponent

  ],
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    SharedModule,
    NgxUiLoaderModule
  ]
})
export class CandidatesModule { }
