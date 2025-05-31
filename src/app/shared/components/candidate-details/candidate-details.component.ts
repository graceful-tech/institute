import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription, take } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ValueSet } from '../../../models/common/value-set.model';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';
import { Candidate } from '../../../models/candidates/candidate.model';


@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css'],
})
export class CandidateDetailsComponent {
  
  @Output() savedCandidate = new EventEmitter();

  candidateForm!: FormGroup;
  genderList: Array<ValueSet> = [];
  languages: Array<ValueSet> = [];
  maritalStatus: Array<ValueSet> = [];
  candidateId: any;
  showError: boolean = false;
  mobileNumbers: Array<String> = [];
  requirementId!: number;
  customFields: Array<any> = [];
  currentRequest!: Subscription;
  fieldDetails: Array<any> = [];
  dialogRef: any;
  resumeDetails: Array<any> = [];
  resumeDetailsSubscription!: Subscription;
  loaderImagePreview: any;
  customer: any;
  candidatesUrl: any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private gs: GlobalService,
    private datePipe: DatePipe,
    private dialog: DialogService,
    private ngxLoader: NgxUiLoaderService
  ) {}

  ngOnInit() {
    this.createCandidateForm();
    this.getGenderList();
    this.getLanguages();
    this.getMaritalStatusList();
    this.getFieldDetails();

  

    this.resumeDetailsSubscription = this.gs.resumeDetails$.subscribe(
      (response: any) => {
        this.resumeDetails = response?.parsedData;

        if (this.resumeDetails) {
          this.checkIfMobileNumberExists();
        }
      }
    );

    
  }

  checkIfMobileNumberExists() {
    let mobileNumber = this.resumeDetails.find(
      (resume: any) => resume.key == 'MobileNo'
    )?.values;
    mobileNumber = mobileNumber?.replace(/\s/g, '').substr(-10);

    if (mobileNumber && !this.candidateForm.value.mobileNumber) {
      this.candidateForm.controls['mobileNumber'].setValue(mobileNumber);
      this.getCandidateDetailsByMobileNumber();
      this.ngxLoader.stop();
    } else {
      this.patchCandidateFormWithResumeDetails();
    }
  }

  ngAfterViewInit() {}

  createCandidateForm() {
    this.candidateForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      mobileNumber: [
        '',
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      gender: [''],
      languagesKnown: [''],
      qualification: [''],
      parentContact:[''],
      address:[''],
      location:[''],
      maritalStatus:[''],
      nationality:['']
      
    });
  }

  patchCandidateForm(candidate: Candidate) {
    this.candidateForm.controls['mobileNumber'].enable();

    this.candidateForm.patchValue({
      id: candidate?.id,
      name: candidate?.name,
      mobileNumber: candidate?.mobileNumber,
      email: candidate?.email,
      nationality: candidate?.nationality,
      gender: candidate?.gender,
      languagesKnown: candidate?.languagesKnown,
      parentContact:candidate?.languagesKnown,
      address:candidate?.address,
      location:candidate?.location,
      maritalStatus:candidate?.maritalStatus,
      qualification:candidate?.qualification,
     
    });
  }

  
  getCandidateDetailsById() {
    this.ngxLoader.start();
    if (this.candidateId) {
      const route = `candidate/${this.candidateId}`;
      this.api.get(route).subscribe({
        next: (response) => {
          const candidate = response as Candidate;
          this.candidateId = candidate.id;
          this.patchCandidateForm(candidate);
          this.candidateForm.controls['mobileNumber'].enable();
          this.candidateId = candidate.id;
      
          this.ngxLoader.stop();
        },
      });
    }
  }

  getGenderList() {
    const route = 'value-sets/search-by-code';
    const postData = { valueSetCode: 'GENDER' };
    this.api.retrieve(route, postData).subscribe({
      next: (response) => {
        this.genderList = response;
      },
    });
  }

  getLanguages() {
    const route = 'value-sets/search-by-code';
    const postData = { valueSetCode: 'LANGUAGES' };
    this.api.retrieve(route, postData).subscribe({
      next: (response) => {
        this.languages = response;
      },
    });
  }

  getMaritalStatusList() {
    const route = 'value-sets/search-by-code';
    const postData = { valueSetCode: 'MARTIAL_STATUS' };
    this.api.retrieve(route, postData).subscribe({
      next: (response) => {
        this.maritalStatus = response;
      },
    });
  }

  searchMobileNumbers(event: any) {
    const route = 'candidates/search-mobile-numbers';
    const postData = { mobileNumber: event.query };
    this.api.retrieve(route, postData).subscribe({
      next: (response) => {
        this.mobileNumbers = response as String[];
      },
    });
  }

  getCandidateDetailsByMobileNumber() {
    
    if (this.currentRequest) {
      this.currentRequest.unsubscribe();
    }
    const route = 'candidate/search-by-mobile-number';
    const postData = { mobileNumber: this.candidateForm.value.mobileNumber };
    this.currentRequest = this.api.retrieve(route, postData).subscribe({
      next: (response) => {
        
    
      },
      error: (error) => {
        this.gs.showMessage('Error', 'Candidate Already Exits');
        // this.savedCandidate.emit({ response: 'error' });
        this.ngxLoader.stop();
      },
    });
  }

 

  getFieldDetails() {
    const route = 'field-details';
    const payload = {};

    this.api.retrieve(route, payload).subscribe({
      next: (response) => {
        this.fieldDetails = response;
        this.addMandatoryValidation();
      },
    });
  }

  addMandatoryValidation() {
    this.fieldDetails.forEach((field) => {
      if (
        field.displayFlag == 'Y' &&
        field.mandatoryFlag == 'Y' &&
        field.editFlag == 'Y'
      ) {
        this.candidateForm.controls[field.fieldName].addValidators(
          Validators.required
        );
        this.candidateForm.controls[field.fieldName].updateValueAndValidity();
      }
    });
  }

  isRequired(fieldName: string) {
    return this.candidateForm.controls[fieldName].hasValidator(
      Validators.required
    );
  }

  display(fieldName: string) {
    return this.fieldDetails.some(
      (field) => field.fieldName == fieldName && field.displayFlag == 'Y'
    );
  }

  saveCandidate() {
    this.ngxLoader.start();
    const route = 'candidate/create';
    const payload = this.candidateForm.getRawValue();

    //  if (Object.is(payload.languagesKnown, '')) {
    //   payload.languagesKnown = '';
    // }

    this.api.create(route, payload).subscribe({
      next: (response) => {
        this.candidateId = response;
        this.savedCandidate.emit({
          response: 'success',
          candidateId: this.candidateId,
        });
        this.ngxLoader.stop();
      },
      error: (error) => {
        this.gs.showMessage('Error', 'Error in Creating Candidate');
        // this.savedCandidate.emit({ response: 'error' });
        this.ngxLoader.stop();
      },
    });
  }

  updateCandidate() {
    this.ngxLoader.start();
    const route = 'candidate/update';
    const payload = this.candidateForm.getRawValue();

    //  if (Object.is(payload.languagesKnown, '')) {
    //   payload.languagesKnown = '';
    // }

    this.api.create(route, payload).subscribe({
      next: (response) => {
        this.candidateId = response;
        this.savedCandidate.emit({
          response: 'success',
          candidateId: this.candidateId,
        });
        this.ngxLoader.stop();
      },
      error: (error) => {
        this.gs.showMessage('Error', 'Error in Creating Candidate');
        // this.savedCandidate.emit({ response: 'error' });
        this.ngxLoader.stop();
      },
    });
  }

 

 
  

  

  patchCandidateFormWithResumeDetails() {
    if (this.resumeDetails) {
      let mobileNumber = this.resumeDetails.find(
        (resume: any) => resume.key == 'MobileNo'
      )?.values;
      // let alternateMobileNumber = this.resumeDetails.find(
      //   (resume: any) => resume.key == 'AlternateMobileNo'
      // )?.values;
      // let skills = this.resumeDetails.find(
      //   (resume: any) => resume.key == 'skills'
      // )?.values;
      // skills = skills.split(',');

      if (mobileNumber) {
        mobileNumber = mobileNumber?.replace(/\s/g, '').substr(-10);
      }

      // if (alternateMobileNumber) {
      //   alternateMobileNumber = alternateMobileNumber
      //     ?.replace(/\s/g, '')
      //     .substr(-10);
      // }

      if (!this.candidateForm.value.mobileNumber) {
        this.candidateForm.controls['mobileNumber'].setValue(mobileNumber);
      }

      // if (!this.candidateForm.value.alternateMobileNumber) {
      //   this.candidateForm.controls['alternateMobileNumber'].setValue(
      //     alternateMobileNumber
      //   );
      // }

      if (!this.candidateForm.value.name) {
        this.candidateForm.controls['name'].setValue(
          this.resumeDetails.find((resume: any) => resume.key == 'FullName')
            ?.values
        );
      }

      if (!this.candidateForm.value.email) {
        this.candidateForm.controls['email'].setValue(
          this.resumeDetails.find((resume: any) => resume.key == 'Email')
            ?.values
        );
      }

      // if (!this.candidateForm.value.languagesKnown) {
      //   this.candidateForm.controls['skills'].setValue(skills);
      // }

      if (!this.candidateForm.value.qualification) {
        this.candidateForm.controls['qualification'].setValue(
          this.resumeDetails.find(
            (resume: any) => resume.key == 'HighestDegree'
          )?.values
        );
      }

      if (!this.candidateForm.value.gender) {
        this.candidateForm.controls['gender'].setValue(
          this.resumeDetails.find((resume: any) => resume.key == 'Gender')
            ?.values
        );
      }
    }
  }

  reset() {
    this.candidateId = null;
    this.candidateForm.reset();
    this.candidateForm.controls['mobileNumber'].enable();
    this.resumeDetails = [];
    //this.gs.setResumeDetails(null);
  }

  ngOnDestroy() {
    this.reset();
    if (this.resumeDetailsSubscription) {
      this.resumeDetailsSubscription.unsubscribe();
    }
  }
  canDeactivate() {
    return new Promise((resolve, Reject) => {
      resolve(confirm('Are you sure want to leave this page ?'));
    });
  }

  setResumeDetails(event: any) {
    console.log('calling from candidate', event);

    if (!this.candidateForm.getRawValue().mobileNumber) {
      this.candidateForm.controls['mobileNumber'].setValue(
        event?.personal_details?.mobile
      );
    }

    if (!this.candidateForm.value.name) {
      this.candidateForm.controls['name'].setValue(
        event?.personal_details?.name
      );
    }

    if (!this.candidateForm.value.email) {
      this.candidateForm.controls['email'].setValue(
        event?.personal_details?.email
      );
    }

    if (!this.candidateForm.value.gender) {
      this.candidateForm.controls['gender'].setValue(
        event?.personal_details?.gender
      );
    }

    if (!this.candidateForm.value.qualification) {
      this.candidateForm.controls['qualification'].setValue(
        event?.educational_qualification?.qualification
      );
    }

    if (!this.candidateForm.value.languagesKnown) {
      this.candidateForm.controls['languagesKnown'].setValue(
        event?.personal_details?.languageKnown
      );
    }

    if (!this.candidateForm.value.companyName) {
      this.candidateForm.controls['companyName'].setValue(
        event?.work_experience?.company
      );
    }

    if (!this.candidateForm.value.totalWorkExperience) {
      this.candidateForm.controls['totalWorkExperience'].setValue(
        event?.work_experience?.duration
      );
    }

    if (!this.candidateForm.value.skills) {
      this.candidateForm.controls['skills'].setValue(
        event?.skills
      );
    }

    if (!this.candidateForm.value.currentLocation) {
      this.candidateForm.controls['currentLocation'].setValue(
        event?.place
      );
    }

    if (!this.candidateForm.value.alternateMobileNumber) {
      this.candidateForm.controls['alternateMobileNumber'].setValue(
        event?.personal_details?.alternateMobile
      );
    }
  }

  getLoaderImage() {
    const route = 'customer-miscellaneous/get-loader-image';
    const payload = { customerId: this.customer.id };

    this.api.downloadFile(route, payload).subscribe({
      next: (response) => {
        if(response?.size > 30){
          this.loaderImagePreview = URL.createObjectURL(response);
          }
          else{
            this.loaderImagePreview ='assets/logo/loader-logo.png';
          }
      },
      error: (error) => {},
    });
  }
}
