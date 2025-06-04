import { Component, ViewChild } from '@angular/core';
import { CandidateDetailsComponent } from '../../../shared/components/candidate-details/candidate-details.component';
import { CandidateCommentComponent } from '../../../shared/components/candidate-comment/candidate-comment.component';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';
import { DatePipe } from '@angular/common';
import { CourceDetailsComponent } from '../cource-details/cource-details.component';
import { PaymentComponent } from '../payment/payment.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-candidate',
  standalone: false,
  templateUrl: './create-candidate.component.html',
  styleUrl: './create-candidate.component.css'
})
export class CreateCandidateComponent {
 @ViewChild(CandidateDetailsComponent) candidateDetails!: CandidateDetailsComponent;
 @ViewChild(CandidateCommentComponent) candidateComment!: CandidateCommentComponent;
 @ViewChild(CourceDetailsComponent) candidateCourse!: CourceDetailsComponent;
  @ViewChild(PaymentComponent) paymentDetails!: PaymentComponent;

  
  dataLoaded: boolean = true;
  candidateId: any;

  constructor(private api: ApiService, private gs: GlobalService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
     
  }

  

  saveCandidate() {
    if (this.candidateDetails.candidateForm.valid && this.candidateCourse.courseForm.valid) {
      this.dataLoaded = false;
      this.candidateDetails.saveCandidate();
    } else {
      this.candidateDetails.showError = true;
      this.candidateCourse.showError = true;
    }
  }

  complete(event: any) {
    this.dataLoaded = true;
    if(event.response == 'success'){
      this.dataLoaded = false;
       
      this.candidateCourse.candidateId = event.candidateId;
      this.candidateCourse.saveCourse();
     
      this.paymentDetails.candidateId = event.candidateId;
      this.paymentDetails.savepayment();
      
       this.candidateComment.candidateId = event.candidateId;
       this.candidateComment.createComment();
    
       this.candidateDetails.reset();
       this.candidateCourse.reset();
       this.paymentDetails.reset();
       
       this.gs.showMessage('success', 'Candidate details saved successfully.');
       this.dataLoaded = true;

        this.router.navigate(['/candidates']);
  }
   this.dataLoaded = true;
  }

   
}
