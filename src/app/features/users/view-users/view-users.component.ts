import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../models/admin/student';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';
import { Subscription } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-view-users',
  standalone: false,
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent {

  availableUsers: any;
  searchForm!: FormGroup;
  totalRecords: number = 0;
  maxLimitPerPage: number = 10;
  dataLoaded: any;
  currentPage: number = 1;
  pageType: any;
  currentRequest!: Subscription;
  userDetails: any;
  users!: User[];

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
  ) {
  }

  ngOnInit() {
  
    this.createSearchForm();

     this.searchUsers();

    this.searchForm.valueChanges.subscribe((response) => {
      // this.listApplication.searchData = this.searchForm.value;
      this.searchUsers();
    });

  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  searchUsers() {
    const route = 'user/search';
    const postData = this.searchForm.value;
    postData['page'] = this.currentPage;
    postData['limit'] = this.maxLimitPerPage;

    this.api.retrieve(route, postData).subscribe({
      next: (response) => {
        this.availableUsers = response?.results as User[];
        this.totalRecords = response?.totalRecords;
      },
    });
  }


   


  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.maxLimitPerPage = event.rows;
    this.searchUsers();
  }
}
