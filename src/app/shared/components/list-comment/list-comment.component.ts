import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';


@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent {
  comments: Array<any> = [];
  candidateId: any;
  commentForm!: FormGroup;
  dataLoaded: boolean = true;
  commentReminder :Array<any> = [];

  constructor(private api: ApiService, private fb: FormBuilder, private gs: GlobalService) { }

  ngOnInit() {
    this.createCommentForm();
    this.getComments();
    this.getCommentReminder();
    
  }

  createCommentForm() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      commentReminder: [false],
    });
  }

  createComment() {
    this.dataLoaded = false;
    const route = 'comments/create';
    const postData = this.commentForm.value;
    postData['appliedJobId'] = this.candidateId;

    this.api.create(route, postData).subscribe({
      next: response => {
        this.dataLoaded = true;
        this.commentForm.reset();
        this.getComments();
        this.gs.showToast('success', response.message);
      },
      error: error => {
        this.dataLoaded = true;
        this.gs.showToast('error', error.error.message);
      }
    })
  }

  getComments() {
    const route = 'comments';
    const postData = { appliedJobId: this.candidateId }
    this.api.retrieve(route, postData).subscribe({
      next: (response: any) => {
        this.comments = response?.results as Array<any>;
      },
    })
  }

  getCommentReminder() {
    const route = 'value-sets/search-by-code';
    const postData = { valueSetCode: 'COMMENT_REMINDER' }
    this.api.retrieve(route, postData).subscribe({
      next: response => {
        this.commentReminder = response;
      },
    })
  }
}
