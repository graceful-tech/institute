import { CommonModule } from "@angular/common";
 import { PrimengModule } from "../primeng/primeng.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { ClipboardModule } from 'ngx-clipboard';
import { NgModule } from "@angular/core";
import { MessageComponent } from "./message/message.component";
import { ClickedOutsideDirective } from "./directives/clicked-outside.directive";
import { LoginPopupComponent } from "./popup/login-popup/login-popup.component";
import { MatIconModule } from '@angular/material/icon';
import { HammerModule } from '@angular/platform-browser';
import { InstituteDividerComponent } from "./components/institute-divider/institute-divider.component";
import { ListCommentComponent } from "./components/list-comment/list-comment.component";
import { CandidateDetailsComponent } from "./components/candidate-details/candidate-details.component";
import { CandidateCommentComponent } from "./components/candidate-comment/candidate-comment.component";
  
 
 
@NgModule({
  declarations: [
   ClickedOutsideDirective,
   MessageComponent,
   LoginPopupComponent ,
   InstituteDividerComponent,
   ListCommentComponent,
   CandidateDetailsComponent,
   CandidateCommentComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClipboardModule,
    PrimengModule,
    ClickedOutsideDirective,
    MessageComponent,
    LoginPopupComponent,
    MatIconModule,
    NgxUiLoaderModule,
    InstituteDividerComponent,
    ListCommentComponent,
    CandidateDetailsComponent,
    CandidateCommentComponent
  ]
})
export class SharedModule { }
