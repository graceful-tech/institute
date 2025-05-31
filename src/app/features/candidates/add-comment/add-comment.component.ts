import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';


@Component({
  selector: 'app-add-comment',
  standalone:false,
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
  commentForm!: FormGroup;
  candidateId!: number;
  showError: boolean = false;
  errorMessage!: string;

  constructor(private api: ApiService, public ref: DynamicDialogRef, public config: DynamicDialogConfig,
    private fb: FormBuilder, private gs: GlobalService) { }

  ngOnInit() {
    this.createCommentForm();
    this.candidateId = this.config.data?.candidateId;
  }

  createCommentForm() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    })
  }

  createComment() {
    if (this.commentForm.valid) {
      const route = 'comments/create';
      const postData = this.commentForm.value;
      postData['candidateId'] = this.candidateId;

      this.api.create(route, postData).subscribe({
        next: response => {
          this.close('SUCCESS');
          this.gs.showMessage('Success', response.message);
        },
        error: error => {
          this.gs.showMessage('Error', error.message);
        }
      })
    } else {
      this.showError = true;
    }
  }

  close(response: string) {
    this.ref.close(response);
  }
}
