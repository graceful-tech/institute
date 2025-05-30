import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
 createAccountForm!: FormGroup;
  showError = false;
  loadingFlag: boolean = false;
  

  constructor(
    private fb: FormBuilder, 
    private api: ApiService, 
    private gs: GlobalService, 
    private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();

  }

  createRegisterForm() {
    this.createAccountForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      companyName: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      cityId: ['', Validators.required],
      branch: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  createAccount() {
    // if (this.createAccountForm.valid) {
    //   this.loadingFlag = true;
    //   const route = 'customers';
    //   const postData = this.createAccountForm.value;

    //   this.api.retrieveFromHurecom(route, postData).subscribe({
    //     next: response => {
    //       const customer = response as any;
    //       localStorage.setItem('tenant', customer.tenant);
    //       this.createOrganizationAndUser(customer);
    //     },
    //     error: error => {
    //       localStorage.clear();
    //       if (error.error?.message === 'Customer is already registered with email or mobile number.') {
    //         this.gs.showMessage('Error', error.error?.message);
    //       } else {
    //         this.gs.showMessage('Success', 'Thank you for choosing Hurecom. We are setting up your account. Our team will get back to you in 24hrs.');
    //       }
    //       this.loadingFlag = false;
    //     }
    //   })
    // } else {
    //   this.showError = true;
    // }
  }

  

}
