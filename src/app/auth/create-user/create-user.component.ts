import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/admin/student';

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
  error!: string;
  userId!: number;



  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private gs: GlobalService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.createRegisterForm();
    this.route.paramMap.subscribe(param => {
      const pathId = param.get('id');
      if (pathId) {
        this.userId = parseInt(pathId);
        this.getUserById();
      }
    });



  }

  createRegisterForm() {
    this.createAccountForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  createAccount() {
     
    if (this.createAccountForm.valid) {
      this.loadingFlag = true;
      const route = 'user/create';
      const postData = this.createAccountForm.value;

      this.api.retrieve(route, postData).subscribe({
        next: response => {
          this.loadingFlag = false;
          const customer = response as any;
          this.gs.openLogin('Success', 'Your Acoount Created Successfully');
          console.log(customer);
        },
        error: (error) => {
          this.error = error.error?.message;
          this.loadingFlag = false;
        }
      })
    } else {
      this.showError = true;
    }
  }

  updateAccount() {
    if (this.createAccountForm.valid) {
      this.loadingFlag = true;
      const route = `user/update/${this.userId}`;
      const postData = this.createAccountForm.getRawValue();

      this.api.update(route, postData).subscribe({
        next: response => {
          this.loadingFlag = false;
          const customer = response as any;
          this.router.navigate(['view-user']);
          // this.gs.openLogin('Success', 'Your Acoount Updated Successfully');
          console.log(customer);
        },
        error: (error) => {
          this.error = error.error?.message;
          this.loadingFlag = false;
        }
      })
    } else {
      this.showError = true;
    }
  }

  patchUserForm(user: User) {
    this.createAccountForm.patchValue({
      id: user?.id,
      name: user?.name,
      mobileNumber: user?.mobileNumber,
      email: user?.email,
      userName: user?.userName,
      password: user?.password

    });
  }

  getUserById() {
    const route = `user/${this.userId}`;
    this.api.get(route).subscribe({
      next: response => {
        const user = response as User;
        console.log(user)
        // this.getActiveOrganizationLocations(user?.organization?.id);
        // this.getTeamsByUserId();
        this.patchUserForm(user);
      }
    });
  }

}
