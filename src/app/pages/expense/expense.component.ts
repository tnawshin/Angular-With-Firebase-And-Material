import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IExpense } from 'src/app/ExpenseReimb';
import { ExpenseService } from '../../services/expense.service';
import { DialogService } from '../../services/dialog.service';
import { NotificationService } from '../../services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  fileLabel = 'Choose File';

  Id;
  submitted: boolean = false;
  expenseForm: FormGroup;
  expense: IExpense;
  submitText: string = "Add Expense";
  listData: MatTableDataSource<any>;
  expenses: any;

  //expenseToEdit: IExpense;
  editState: boolean = false;

  //message:string = "";
  result: string = "";

  expensesType: string[] = ["Telephone/Mobile Bill", "Mobile Bill", "Team Lunch", "Car Rental", "Relocation Baggage"];
  cities: string[] = ["Herndon, VA", "Reston, VA", "Mclean, VA", "Alpharetta, GA", "Sandy Springs, GA", "Chicago, IL", "Dallas, TX", "NYC, NY", "New Jersey, NJ"];
  paymentsType: string[] = ["Visa", "Master Card", "Cash", "American Express", "Discover"];
  receiptsType: string[] = ["Receipt", "No Receipt"];
  
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this. fileLabel = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this. fileLabel += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileLabel = 'Choose File';
    }
  }

  constructor(private expService: ExpenseService,
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }


  incrementUniqueId() {

    //this.id += 1;

  }

  ngOnInit(): void {

    this.Id = this.activateRoute.snapshot.params['id'];
    if (this.Id) {
      //update
      this.submitText = "Update Expense";
      console.log('OnInit - expense');
      console.log(this.Id);
      this.expService.getExpenses2(this.Id).subscribe((res) => {
        console.log('getExpMethod', res);
        this.expense = <IExpense>res;
        console.log('postexp', this.expense);

        this.expenseForm = new FormGroup({
          expenseId: new FormControl(''),
          expenseType: new FormControl('', Validators.required),
          transactionDate: new FormControl('', Validators.required),
          businessPurpose: new FormControl('', Validators.required),
          amount: new FormControl('', Validators.required),
          receiptStatus: new FormControl('', Validators.required),
          paymentType: new FormControl('', Validators.required),
          vendorName: new FormControl('', Validators.required),
          city: new FormControl('', Validators.required),
          //fileAttr: new FormControl(this.fileAttr)
        });
        this.expenseForm.get('expenseId').setValue(this.expense.expenseId);
        this.expenseForm.get("expenseType").setValue(this.expense.expenseType);
        this.expenseForm.get("transactionDate").setValue(this.expense.transactionDate);
        this.expenseForm.get("businessPurpose").setValue(this.expense.businessPurpose);
        this.expenseForm.get("amount").setValue(this.expense.amount);
        this.expenseForm.get("receiptStatus").setValue(this.expense.receiptStatus);
        this.expenseForm.get("paymentType").setValue(this.expense.paymentType);
        this.expenseForm.get("vendorName").setValue(this.expense.vendorName);
        this.expenseForm.get("city").setValue(this.expense.city);
        //this.expenseForm.get("fileAttr").setValue(this.expense.fileAttr);
      });

    } else {
      this.getCount();

      //create
      this.expenseForm = new FormGroup({
        expenseId: new FormControl(''),
        expenseType: new FormControl('', Validators.required),
        transactionDate: new FormControl('', Validators.required),
        businessPurpose: new FormControl('', Validators.required),
        amount: new FormControl('', Validators.required),
        receiptStatus: new FormControl('', Validators.required),
        paymentType: new FormControl('', Validators.required),
        vendorName: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        //fileAttr: new FormControl('')
      });
    }
  };

  get expenseId() { return this.expenseForm.get("expenseId") }
  get expenseType() { return this.expenseForm.get("expenseType") }
  get transactionDate() { return this.expenseForm.get("transactionDate") }
  get businessPurpose() { return this.expenseForm.get("businessPurpose") }
  get amount() { return this.expenseForm.get("amount") }
  get receiptStatus() { return this.expenseForm.get("receiptStatus") }
  get paymentType() { return this.expenseForm.get("paymentType") }
  get vendorName() { return this.expenseForm.get("vendorName") }
  get city() { return this.expenseForm.get("city") }
  //get fileAttr(){ return this.expenseForm.get('fileAttr')}

  onSubmit() {
    this.submitted = true;
    console.log(this.expenseForm.value);

    //this.message = "Added successfully!!!";
    if (this.Id) {
      this.updateRecord(this.expenseForm.value);
    }
    else {
      this.dialogService.openConfirmDialog('Are you sure to add this record ?')
        .afterClosed().subscribe(res => {
          console.log(res);
          if (res) {
            //this.expService.deleteExpense(this.expenseForm.value);
            this.expService.createExpense(this.expenseForm.value);
            this.notificationService.success('Record is submiited successfully!!');
          }
          this.onClose();
          this.router.navigate(['/']);
        });
    }
  };

  getCount() {
    this.expService.getExpenses().forEach(res => {
      this.expenses = res.map(e => {
        return {
          expenseId: e.payload.doc.id,
          uniqueId: e.payload.doc.data()['uniqueId'],
          expenseType: e.payload.doc.data()['expenseType'],
          transactionDate: e.payload.doc.data()['transactionDate'],
          amount: e.payload.doc.data()['amount'],
          receiptStatus: e.payload.doc.data()['receiptStatus'],
          businessPurpose: e.payload.doc.data()['businessPurpose'],
          city: e.payload.doc.data()['city'],
          vendorName: e.payload.doc.data()['vendorName']
        }
      });
      //console.log(this.expenses);
      this.listData = new MatTableDataSource(this.expenses);
    });
    console.log('OnNewLoad',this.expenses);
    return 0;
  }

  onClose() {
    this.expenseForm.reset();
    //this.dialogRef.close();
  }

  onClear() {
    this.expenseForm.reset();
    //this.message = "";
  }

  populateForm(expense) {
    this.expenseForm.setValue(expense);
  }

  updateRecord(expense) {
    console.log("update Data from Expense component");
    console.log(this.Id);

    this.dialogService.openConfirmDialog('Are you sure to update this record ?')
      .afterClosed().subscribe(res => {
        console.log(res);
        if (res) {
          this.expenseForm.value.expenseId = this.Id;
          this.expService.updateItem(this.expenseForm.value);
          this.notificationService.success('Record is updated successfully!!');
        }
        this.router.navigate(['/']);

      });
  }
}
