import { Component, Input, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
import { DatePipe } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dashboard-comments',
  standalone: false,
  templateUrl: './dashboard-comments.component.html',
  styleUrl: './dashboard-comments.component.css'
})
export class DashboardCommentsComponent {
 
 @Input() filterType!: string;
 @Input() fromDate!: Date;
 @Input() toDate!: Date;
 @Input() userName!: any;
  commentsReminder!: Comment[];

 constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private gs: GlobalService,
    private datePipe: DatePipe,
    private dialog: DialogService,
  ) {}

  ngOnInit() {
   this.getCommentsReminder(); 
  }

   ngOnChanges(changes: SimpleChanges) {
    if ( changes['userName'] ||
        changes['filterType'] || 
        changes['fromDate'] ||
        changes['toDate']) {
      this.getCommentsReminder();
    }
  }
     

    getCommentsReminder() {
    const route = 'comments/dashboardComment';
    const payload = { 
       userName:this.userName,
       page: 1, limit: 5 , 
       filterType: this.filterType,
       fromDate: this.fromDate ? this.datePipe.transform(this.fromDate, 'yyyy-MM-dd') : null,
       toDate: this.toDate ? this.datePipe.transform(this.toDate, 'yyyy-MM-dd') : null
       
      };
      
    this.api.retrieve(route, payload).subscribe({
      next: response => {
        this.commentsReminder = response?.results as Comment[];
      },
    });
    }
  
}
