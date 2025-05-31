import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-candidate-comment',
  templateUrl: './candidate-comment.component.html',
  styleUrl: './candidate-comment.component.css',
})
export class CandidateCommentComponent {
  comments: Array<any> = [];
  candidateId: any;
  commentForm!: FormGroup;
  dataLoaded: boolean = true;
  commentReminder: Array<any> = [];

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private gs: GlobalService
  ) {}

  ngOnInit() {
    this.createCommentForm();
    this.getComments();
  
  }

  createCommentForm() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
    });
  }

  createComment() {
    this.dataLoaded = false;
    const route = 'comments/create';
    const payload = this.commentForm.value;
    payload['candidateId'] = this.candidateId;
   
    
   
    this.api.create(route, payload).subscribe({
      next: (response) => {
        this.dataLoaded = true;
        this.commentForm.reset();
      },
      error: (error) => {
        this.dataLoaded = true;
        this.gs.showToast('error', error.error.message);
      },
    });
  }

  getComments() {
    const route = 'comments';
    const postData = { candidateId: this.candidateId };
    this.api.retrieve(route, postData).subscribe({
      next: (response: any) => {
        this.comments = response?.results as Array<any>;
      },
    });
  }

  getCommentReminder() {
    const route = 'value-sets/search-by-code';
    const postData = { valueSetCode: 'COMMENT_REMINDER' };
    this.api.retrieve(route, postData).subscribe({
      next: (response) => {
        this.commentReminder = response;
      },
    });
  }
}
