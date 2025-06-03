import { Component } from '@angular/core';
import { Candidate } from '../../../models/candidates/candidate.model';
import { ValueSet } from '../../../models/common/value-set.model';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-payment-details',
  standalone: false,
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent {

candidates: Array<Candidate> = [];
  batchPreferenceList: Array<ValueSet> = [];
  modeList: Array<ValueSet> = [];
  currentPage: number = 1;
  maxLimitPerPage: number = 10;
  totalRecords: number = 0;
  searchForm!: FormGroup;
  currentRequest!: Subscription;
  userDetails: any;
  pageType: any;
  dataLoaded: boolean = true;
  skillsArrays: Array<any> = [];
  jmMactcher: boolean = true;
  toggle: boolean = false;
  isMatcherVisible: boolean = false;
  loaderImagePreview: any;
  showError: boolean = false;
  candidateDeleted:any;
  candidateDetails: any;
  courseNameList: Array<ValueSet> = [];
  users: any;
  usersList: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private gs: GlobalService,
    private router: Router,
    public ref: DynamicDialogRef,
    private dialog: DialogService,
    private ngxLoader: NgxUiLoaderService
  ) {
       this.createSearchForm();
  }



  ngOnInit() {
  
    this.getBatchPreferenceList();
    this.getCourseNameList();
    this.getModeList();

    this.searchCandidates();
    this.getAllUsers();

    this.searchForm.valueChanges.subscribe((response) => {
      this.searchCandidates();
    });
  }

   createSearchForm() {
    this.searchForm = this.fb.group({
      search: [''],
      mode: [''],
      batchPreference: [''],
      userName:['']
      
      
    });
  }


  getBatchPreferenceList() {
    const route = 'value-sets/search-by-code';
    const postData = { valueSetCode: 'BATCH_PREFERENCE' };
    this.api.retrieve(route, postData).subscribe({
      next: (response) => {
        this.batchPreferenceList = response;
      },
    });
  }

   searchCandidates() {
    this.ngxLoader.start();
    this.dataLoaded = false;
    if (this.currentRequest) {
      this.currentRequest.unsubscribe();
    }

    const route = 'candidate/search';
    const payload = this.searchForm.value;

  

    payload['page'] = this.currentPage;
    payload['limit'] = this.maxLimitPerPage;
    payload['pageType'] = this.pageType;

    this.currentRequest = this.api.retrieve(route, payload).subscribe({
      next: (response) => {
        this.candidateDetails = response?.results;
        this.totalRecords = response?.totalRecords;
        this.dataLoaded = true;
        this.ngxLoader.stop();
      },
      error: (error) => {
        this.dataLoaded = true;
        this.ngxLoader.stop();
      },
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.maxLimitPerPage = event.rows;
    this.searchCandidates();
  }

  onClickOnEdit(candidateId:any){
  this.router.navigate(['/candidates/edit', candidateId]);
  }

   getSeverity(status: string) {
    const successArray = [
      'Scheduled',
      'Shortlisted',
      'Next Round',
      'Feedback Pending',
      'Selected',
      'Select Offered',
      'Offer Accepted',
      'Joined',
      'To be Schedule',
    ];

    const dangerArray = [
      'Internal Reject',
      'Rejected',
      'Dropped',
      'Select Drop',
      'Offer Declined',
      'Closed',
    ];

    const warnArray = [
      'No Response',
      'Not Interested',
      'Hold',
      'Switch Off',
      'Select Hold',
      'No Show',
    ];

    if (successArray.includes(status)) {
      return 'success';
    } else if (dangerArray.includes(status)) {
      return 'danger';
    } else if (warnArray.includes(status)) {
      return 'warning';
    } else {
      return 'info';
    }
  }

    getModeList() {
    const route = 'value-sets/search-by-code';
    const postData = { valueSetCode: 'MODE' };
    this.api.retrieve(route, postData).subscribe({
      next: (response) => {
        this.modeList = response;
      },
    });
  }

  createCandidate(){
    this.router.navigateByUrl('/candidates/add');
  }


   getCourseNameList() {
    const route = 'value-sets/search-by-code';
    const postData = { valueSetCode: 'COURSE_NAME' };
    this.api.retrieve(route, postData).subscribe({
      next: (response) => {
        this.courseNameList = response;
      },
    });
  }

  getAllUsers() {
    const route = 'user';
    this.api.get(route).subscribe({
      next: (response) => {
        this.usersList = response as any
      },
    });
  }
}
