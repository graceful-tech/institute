import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValueSet } from '../../../models/common/value-set.model';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  searchForm!: FormGroup;
  dateFilterTypes: Array<ValueSet> = [];
  usersList:any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private gs: GlobalService,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService
  ) {}

  ngOnInit() {
    this.createSearchForm();
    this.getDateFilterTypes();
    this.getAllUsers();
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      filterType: ['Today'],
      fromDate: [''],
      toDate: [''],
      userName:[''],
    });
  }

  getDateFilterTypes() {
    const route = 'value-sets/search-by-code';
    const payload = { valueSetCode: 'DATE_FILTER' }
    this.api.retrieve(route, payload).subscribe({
      next: response => {
        this.dateFilterTypes = response as ValueSet[];
      },
    })
  }

   getAllUsers() {
    const route = 'user';
    this.api.get(route).subscribe({
      next: (response) => {
        this.usersList = response as any
      },
    });
  }

  reset() {
     this.searchForm.reset();
  }
}
