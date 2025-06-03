import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { DialogService } from 'primeng/dynamicdialog';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { User } from '../../models/admin/student';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  error!: String;
  showError = false;
  loadingFlag: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private gs: GlobalService,
    private router: Router,
    private dialog: DialogService) { }

  ngOnInit() {
    this.createLoginForm();

    this.gs.paymentStatus$.subscribe(response => {
      if (response == 'Completed') {
        this.gs.showMessage('Success', 'Payment completed successfully.');
        this.gs.setPaymentStatus(null);
      }
    });

  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      mobileNumber: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.loadingFlag = true;
      const route = 'auth/login';
      const postData = this.loginForm.value;
      localStorage.setItem('tenant', postData.code);

      this.api.retrieve(route, postData).subscribe({
        next: response => {
          const user = response as User;
          this.gs.setUser(user);
          this.loadingFlag = false;
          localStorage.setItem('userName', user.userName.toString());
          localStorage.setItem('userId', user.id.toString());
          this.router.navigate(['/candidates']);
          // this.gs.loadData();

        },
        error: error => {
          this.error = error.error?.message
          this.loadingFlag = false;
        }
      })
    } else {
      this.showError = true;
    }
  }

  openSendPasswordResetEmailModal() {
    // this.dialog.open(SendPasswordResetMailComponent, {
    //   header: 'Forgot Password',
    //   width: '25%'
    // });
  }

  openPaymentOptionDialog() {
    // this.dialog.open(PaymentOptionComponent, {
    //   header: 'Payment',
    //   width: '40%'
    // });
  }

}
