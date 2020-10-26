import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css']
})
export class ExpenseDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ExpenseDialogComponent>) { }

  ngOnInit(): void {
  }

  onClose(){
    this.dialogRef.close();
  }

}
