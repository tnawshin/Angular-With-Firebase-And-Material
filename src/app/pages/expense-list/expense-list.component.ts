import { Component, OnInit, ViewChild } from '@angular/core';
import { IExpense } from 'src/app/ExpenseReimb';
import { ExpenseService } from '../../services/expense.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExpenseComponent } from '../expense/expense.component';
import { NotificationService } from 'src/app/services/notification.service';
import { ExpenseDialogComponent} from '../../shared/expense-dialog/expense-dialog.component';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  // expenses : IExpense[];
  expenses : any;

 listData: MatTableDataSource<any>;
 displayColumns: string[] = ['expenseId','expenseType','transactionDate','amount','receiptStatus','businessPurpose','city','vendorName', 'fileAttr','actions'];
 @ViewChild(MatSort) sort:MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;
 searchKey:string;


  constructor(private expService: ExpenseService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit(): void {
    this.expService.getExpenses().subscribe(res => {
      //this.expenses = res;
      this.expenses = res.map(e => {
        return {
          expenseId: e.payload.doc.id,
          expenseType: e.payload.doc.data()['expenseType'],
          transactionDate: e.payload.doc.data()['transactionDate'],
          amount: e.payload.doc.data()['amount'],
          receiptStatus: e.payload.doc.data()['receiptStatus'],
          businessPurpose: e.payload.doc.data()['businessPurpose'],
          city: e.payload.doc.data()['city'],
          vendorName: e.payload.doc.data()['vendorName'],
          fileAttr: e.payload.doc.data()['fileAttr']
        }
      });
      //console.log(this.expenses);
      this.listData = new MatTableDataSource(this.expenses);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      // this.listData.filterPredicate = (data, filter)=>{
      //   return this.displayColumns.some(ele =>{
      //     return ele != 'actions' && data[ele].toLocaleLowerCase().indexOf(filter) != -1;
      //   });
      // }
    });
  }


  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLocaleLowerCase();
  }


  onCreate(){
    console.log("routing to Expense form");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ExpenseDialogComponent, dialogConfig);
  }

  onDelete(expenseId){
    // if(confirm('Are you sure to delete this record ?')){
    //   this.expService.deleteExpense(expenseId);
    //   this.notificationService.warn('Deleted successfully !!');

    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      console.log(res);
      
      if(res){
        this.expService.deleteExpense(expenseId);
        this.notificationService.warn('Record is deleted successfully!!');
      }
    });
  }


  onEdit(expense: IExpense){
    console.log("Expense ID from list component => ", expense);
    this.router.navigate([`edit/${expense}`]);
  }

  

}
