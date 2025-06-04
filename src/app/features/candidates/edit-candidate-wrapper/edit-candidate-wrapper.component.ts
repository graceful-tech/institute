import { Component, ViewChild } from '@angular/core';
import { CandidateDetailsComponent } from '../../../shared/components/candidate-details/candidate-details.component';
import { CandidateCommentComponent } from '../../../shared/components/candidate-comment/candidate-comment.component';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';
import { DatePipe } from '@angular/common';
import { CourceDetailsComponent } from '../cource-details/cource-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-edit-candidate-wrapper',
  standalone: false,
  templateUrl: './edit-candidate-wrapper.component.html',
  styleUrl: './edit-candidate-wrapper.component.css'
})
export class EditCandidateWrapperComponent {
 @ViewChild(CandidateDetailsComponent) candidateDetails!: CandidateDetailsComponent;
 @ViewChild(CandidateCommentComponent) candidateComment!: CandidateCommentComponent;
 @ViewChild(CourceDetailsComponent) candidateCourse!: CourceDetailsComponent;
@ViewChild(PaymentComponent) paymentDetails!: PaymentComponent;

  
  dataLoaded: boolean = true;
  candidateId: any;

  constructor(private route: ActivatedRoute,private api: ApiService, private gs: GlobalService, private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit() {
     this.route.paramMap.subscribe(param => {
      this.gs.setCandidateId(param.get('id'));
      this.candidateId = param.get('id');
    });

    
  }

  ngAfterViewInit() {
      this.candidateDetails.candidateId = this.candidateId;
      this.candidateDetails.getCandidateDetailsById();
            
      this.candidateCourse.candidateId = this.candidateId;
      this.candidateCourse.getCourseDetailsByCandidateId();

      this.paymentDetails.candidateId = this.candidateId;
      this.paymentDetails.getPaymentDetailsByCandidateId();
  }

  

  saveCandidate() {
   if (this.candidateDetails.candidateForm.valid && this.candidateCourse.courseForm.valid ) {
      this.dataLoaded = false;
      this.candidateDetails.updateCandidate();
    } else {
     this.candidateDetails.showError = true;
      this.candidateCourse.showError = true;
      this.paymentDetails.showError = true;
    }
  }

  complete(event: any) {
     this.dataLoaded = true;
  if (event.response == 'success') {
    
    this.dataLoaded = false;

    this.candidateCourse.candidateId = event.candidateId;
    this.candidateCourse.saveCourse();

    // this.paymentDetails.candidateId = event.candidateId;
    // this.paymentDetails.savepayment();
      
    this.dataLoaded = true;
      
    this.gs.showMessage('success', 'Candidate details Updated successfully.');

     this.router.navigate(['/candidates']);
    }
    this.dataLoaded = true;
  }


}
