import { Component, Input, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
import { DatePipe } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dashboard-payment',
  standalone: false,
  templateUrl: './dashboard-payment.component.html',
  styleUrl: './dashboard-payment.component.css'
})
export class DashboardPaymentComponent {
   @Input() filterType!: string;
   @Input() fromDate!: Date;
   @Input() toDate!: Date;
   @Input() userName!: any;
   paymentList: any;
  
   constructor(
      private api: ApiService,
      private fb: FormBuilder,
      private gs: GlobalService,
      private datePipe: DatePipe,
      private dialog: DialogService,
    ) {}
  
    ngOnInit() {
      this.getPaymentReport();
     }
  
     ngOnChanges(changes: SimpleChanges) {
      if ( changes['userName'] ||
          changes['filterType'] || 
          changes['fromDate'] ||
          changes['toDate']) {
        this.getPaymentReport();
      }
    }
       
 getPaymentReport() {
    const route = 'payment/dashboard';
    const payload = { 
       userName:this.userName,
       page: 1, limit:5 , 
       filterType: this.filterType,
       fromDate: this.fromDate ? this.datePipe.transform(this.fromDate, 'yyyy-MM-dd') : null,
       toDate: this.toDate ? this.datePipe.transform(this.toDate, 'yyyy-MM-dd') : null,
       amountPaid:'',
       balanceAmoutn:''

       
      };
      
    this.api.retrieve(route, payload).subscribe({
      next: response => {
        this.paymentList = response?.results;
      },
    });
    }
}
