import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValueSet } from '../../../models/common/value-set.model';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';
import { DatePipe } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { Course } from '../../../models/candidates/couse.model';
import { Payment } from '../../../models/payments/payment';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  @Output() savedPayment = new EventEmitter();

  paymentForm!: FormGroup;
  statusList: any;
  courseId: any;
  showError: boolean = false;
  currentRequest!: Subscription;
  candidateId:any;
  paymentModeList: Array<ValueSet> = [];
  paymentId:any;


  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private gs: GlobalService,
    private datePipe: DatePipe,
    private dialog: DialogService,
  ) {}

  ngOnInit() {
    this.createPaymentForm();
    this.getCourseNameList();
    this.getPaymentDetailsByCandidateId();

      this.paymentForm.valueChanges.subscribe((response) => {
      this.handleBalanceAmountCalculation();
    })
   
  }

  ngAfterViewInit() {}

  createPaymentForm() {
    this.paymentForm = this.fb.group({
      id: [''],
      courseFees:['', Validators.required],
      discount:['', Validators.required],
      paidDate:[''],
      amountPaid:['', Validators.required],
      paymentMode:[''],
      balanceAmount:[{ value: 0, disabled: true }, [Validators.required]]
    });
  }

  patchPaymentForm(payment: Payment) {
 
    const paidDate = payment.paidDate ? new Date(payment.paidDate) : null;

    this.paymentForm.patchValue({
      id: payment?.id,
      courseFees:payment?.courseFees,
      discount:payment?.discount,
      paidDate:paidDate,
      amountPaid:payment?.amountPaid,
      paymentMode:payment?.paymentMode,
      balanceAmount:payment?.balanceAmount,
       
    });
  }

  isRequired(fieldName: string) {
    return this.paymentForm.controls[fieldName].hasValidator(
      Validators.required
    );
  }

 
  savepayment() {  
    const route = 'payment/save';
    const payload = this.paymentForm.getRawValue();

    if (payload.paidDate) {
      payload['paidDate'] = this.datePipe.transform(
        payload.paidDate,
        'yyyy-MM-dd'
      );
    }
    payload['candidateId'] = this.candidateId;

    this.api.create(route, payload).subscribe({
      next: (response: any) => {
        this.paymentId = response;
        
         
      },
      error: (error) => {
        this.gs.showMessage(error.error?.status, error.error?.message);
       // this.savedPayment.emit({ response: 'error' });
      },
    });
  }

  reset() {
    this.paymentForm.reset();
  }

   getCourseNameList() {
    const route = 'value-sets/search-by-code';
    const postData = { valueSetCode: 'PAYMENT_MODE' };
    this.api.retrieve(route, postData).subscribe({
      next: (response) => {
        this.paymentModeList = response;
      },
    });
  }

    getPaymentDetailsByCandidateId() {
     if (this.candidateId) {
      const route = `payment/${this.candidateId}`;
      this.api.get(route).subscribe({
        next: (response) => {
          const payment = response as Payment;
          this.paymentId = payment.id;
          this.patchPaymentForm(payment);
      
         },
      });
    }
  }

  handleBalanceAmountCalculation() {
  this.paymentForm.get('courseFees')!.valueChanges.subscribe(() => this.calculateBalance());
  this.paymentForm.get('discount')!.valueChanges.subscribe(() => this.calculateBalance());
  this.paymentForm.get('amountPaid')!.valueChanges.subscribe(() => this.calculateBalance());
}

calculateBalance() {
  const courseFees = Number(this.paymentForm.get('courseFees')!.value || 0);
  const discount = Number(this.paymentForm.get('discount')!.value || 0);
  const amountPaid = Number(this.paymentForm.get('amountPaid')!.value || 0);

  const balance = courseFees - discount - amountPaid;
  this.paymentForm.get('balanceAmount')!.setValue(balance >= 0 ? balance : 0, { emitEvent: false });
}

}

