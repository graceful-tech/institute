import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValueSet } from '../../../models/common/value-set.model';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';
import { DatePipe } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { Course } from '../../../models/candidates/couse.model';

@Component({
  selector: 'app-cource-details',
  standalone: false,
  templateUrl: './cource-details.component.html',
  styleUrl: './cource-details.component.css'
})
export class CourceDetailsComponent {

  @Output() savedCourse = new EventEmitter();

  courseForm!: FormGroup;
  languages: Array<ValueSet> = [];
  modeList: Array<ValueSet> = [];
  courseNameList: Array<ValueSet> = [];
  batchPreferenceList: Array<ValueSet> = [];
  statusList: any;
  courseId: any;
  showError: boolean = false;
  currentRequest!: Subscription;
  candidateId:any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private gs: GlobalService,
    private datePipe: DatePipe,
    private dialog: DialogService,
  ) {}

  ngOnInit() {
    this.createcourseForm();
    this.getLanguages();
    this.getModeList();
    this.getCourseNameList();
    this.getBatchPreferenceList();
    this.getStatus();

    this.getCourseDetailsByCandidateId();
  }

  ngAfterViewInit() {}

  createcourseForm() {
    this.courseForm = this.fb.group({
      id: [''],
      courseName: [''],
      mode: [''],
      batchName: [''],
      batchEndDate: [''],
      batchStartDate: [''],
      batchPreference: [''],
      counsellorName:[''],
      leadSource:['', Validators.required],
      status:['', Validators.required],
      followUpDate:[''],
   
    });
  }

  patchCourseForm(course: Course) {

    const batchEndDate = course.batchEndDate ? new Date(course.batchEndDate) : null;
    const followUpDate = course.followUpDate ? new Date(course.followUpDate) : null;
    const batchStartDate = course.batchStartDate ? new Date(course.batchStartDate) : null;

    this.courseForm.patchValue({
      id: course?.id,
      courseName:course?.courseName,
      mode:course?.mode,
      batchPreference:course?.batchPreference,
      batchName:course?.batchName,
      batchStartDate:batchStartDate,
      batchEndDate:batchEndDate,
      counsellerName:course?.counsellerName,
      leadSource:course?.leadSource,
      status:course?.status,
      followUpDate:followUpDate,
      
    });
  }

  
  getCourseDetailsById() {
     if (this.courseId) {
      const route = `course/${this.courseId}`;
      this.api.get(route).subscribe({
        next: (response) => {
          const course = response as Course;
          this.courseId = course.id;
          this.patchCourseForm(course);
      
         },
      });
    }
  }

  getCourseDetailsByCandidateId() {
     if (this.candidateId) {
      const route = `course/${this.candidateId}`;
      this.api.get(route).subscribe({
        next: (response) => {
          const course = response as Course;
          this.courseId = course.id;
          this.patchCourseForm(course);
      
         },
      });
    }
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

  getCourseNameList() {
    const route = 'value-sets/search-by-code';
    const postData = { valueSetCode: 'COURSE_NAME' };
    this.api.retrieve(route, postData).subscribe({
      next: (response) => {
        this.courseNameList = response;
      },
    });
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

  getBatchPreferenceList() {
    const route = 'value-sets/search-by-code';
    const postData = { valueSetCode: 'BATCH_PREFERENCE' };
    this.api.retrieve(route, postData).subscribe({
      next: (response) => {
        this.batchPreferenceList = response;
      },
    });
  }

  

  getCourseDetailsByMobileNumber() {
    
    if (this.currentRequest) {
      this.currentRequest.unsubscribe();
    }
    const route = 'courses/search-by-mobile-number';
    const postData = { mobileNumber: this.courseForm.value.mobileNumber };
    this.currentRequest = this.api.retrieve(route, postData).subscribe({
      next: (response) => {
        const course = response as Course;

        if (course) {
          this.courseId = course.id;
          this.patchCourseForm(course);
         }

      //  this.patchcourseFormWithResumeDetails();

        
      },
    });
  }

 

  

   

  isRequired(fieldName: string) {
    return this.courseForm.controls[fieldName].hasValidator(
      Validators.required
    );
  }

  // display(fieldName: string) {
  //   return this.fieldDetails.some(
  //     (field) => field.fieldName == fieldName && field.displayFlag == 'Y'
  //   );
  // }

  saveCourse() {  
    const route = 'course/create';
    const payload = this.courseForm.getRawValue();

    if (payload.batchStartDate) {
      payload['batchStartDate'] = this.datePipe.transform(
        payload.batchStartDate,
        'yyyy-MM-dd'
      );
    }

    if (payload.batchEndDate) {
      payload['batchEndDate'] = this.datePipe.transform(
        payload.batchEndDate,
        'yyyy-MM-dd'
      );
    }

     if (payload.followUpDate) {
      payload['followUpDate'] = this.datePipe.transform(
        payload.followUpDate,
        'yyyy-MM-dd'
      );
    }
    
    payload['candidateId'] = this.candidateId;


    this.api.create(route, payload).subscribe({
      next: (response: any) => {
        this.courseId = response;
        this.savedCourse.emit({
          response: 'success',
          courseId: this.courseId,
        });
         
      },
      error: (error) => {
        this.gs.showMessage(error.error?.status, error.error?.message);
        this.savedCourse.emit({ response: 'error' });
      },
    });
  }

  getStatus() {
      const route = 'status';
      this.api.get(route).subscribe({
        next: (response) => {
          this.statusList = response as any;
         },
      });

  }

 
  

  

  // patchcourseFormWithResumeDetails() {
  //   if (this.resumeDetails) {
  //     let mobileNumber = this.resumeDetails.find(
  //       (resume: any) => resume.key == 'MobileNo'
  //     )?.values;
  //     let alternateMobileNumber = this.resumeDetails.find(
  //       (resume: any) => resume.key == 'AlternateMobileNo'
  //     )?.values;
  //     let skills = this.resumeDetails.find(
  //       (resume: any) => resume.key == 'skills'
  //     )?.values;
  //     skills = skills.split(',');

  //     if (mobileNumber) {
  //       mobileNumber = mobileNumber?.replace(/\s/g, '').substr(-10);
  //     }

  //     if (alternateMobileNumber) {
  //       alternateMobileNumber = alternateMobileNumber
  //         ?.replace(/\s/g, '')
  //         .substr(-10);
  //     }

  //     if (!this.courseForm.value.mobileNumber) {
  //       this.courseForm.controls['mobileNumber'].setValue(mobileNumber);
  //     }

  //     if (!this.courseForm.value.alternateMobileNumber) {
  //       this.courseForm.controls['alternateMobileNumber'].setValue(
  //         alternateMobileNumber
  //       );
  //     }

  //     if (!this.courseForm.value.name) {
  //       this.courseForm.controls['name'].setValue(
  //         this.resumeDetails.find((resume: any) => resume.key == 'FullName')
  //           ?.values
  //       );
  //     }

  //     if (!this.courseForm.value.email) {
  //       this.courseForm.controls['email'].setValue(
  //         this.resumeDetails.find((resume: any) => resume.key == 'Email')
  //           ?.values
  //       );
  //     }

  //     if (!this.courseForm.value.languagesKnown) {
  //       this.courseForm.controls['skills'].setValue(skills);
  //     }

  //     if (!this.courseForm.value.qualification) {
  //       this.courseForm.controls['qualification'].setValue(
  //         this.resumeDetails.find(
  //           (resume: any) => resume.key == 'HighestDegree'
  //         )?.values
  //       );
  //     }

  //     if (!this.courseForm.value.gender) {
  //       this.courseForm.controls['gender'].setValue(
  //         this.resumeDetails.find((resume: any) => resume.key == 'Gender')
  //           ?.values
  //       );
  //     }
  //   }
  // }

  reset() {
    this.courseId = null;
    this.courseForm.reset();
  }

  // ngOnDestroy() {
  //   this.reset();
  //   if (this.resumeDetailsSubscription) {
  //     this.resumeDetailsSubscription.unsubscribe();
  //   }
  // }
   

  setResumeDetails(event: any) {
    console.log('calling from Course', event);

    if (!this.courseForm.getRawValue().mobileNumber) {
      this.courseForm.controls['mobileNumber'].setValue(
        event?.personal_details?.mobile
      );
    }

    if (!this.courseForm.value.name) {
      this.courseForm.controls['name'].setValue(
        event?.personal_details?.name
      );
    }

    if (!this.courseForm.value.email) {
      this.courseForm.controls['email'].setValue(
        event?.personal_details?.email
      );
    }

    if (!this.courseForm.value.gender) {
      this.courseForm.controls['gender'].setValue(
        event?.personal_details?.gender
      );
    }

    if (!this.courseForm.value.qualification) {
      this.courseForm.controls['qualification'].setValue(
        event?.educational_qualification?.qualification
      );
    }

    if (!this.courseForm.value.languagesKnown) {
      this.courseForm.controls['languagesKnown'].setValue(
        event?.personal_details?.languageKnown
      );
    }

    if (!this.courseForm.value.companyName) {
      this.courseForm.controls['companyName'].setValue(
        event?.work_experience?.company
      );
    }

    if (!this.courseForm.value.totalWorkExperience) {
      this.courseForm.controls['totalWorkExperience'].setValue(
        event?.work_experience?.duration
      );
    }

    if (!this.courseForm.value.skills) {
      this.courseForm.controls['skills'].setValue(
        event?.skills
      );
    }

    if (!this.courseForm.value.currentLocation) {
      this.courseForm.controls['currentLocation'].setValue(
        event?.place
      );
    }

    if (!this.courseForm.value.alternateMobileNumber) {
      this.courseForm.controls['alternateMobileNumber'].setValue(
        event?.personal_details?.alternateMobile
      );
    }
  }

  
}
