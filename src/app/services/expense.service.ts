import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { IExpense } from '../ExpenseReimb';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  // expenseCollection: AngularFirestoreCollection<IExpense>;
  // expenses: AngularFireList<IExpense>;
  // //expenses: Observable<any[]>;
  expenseDoc: AngularFirestoreDocument<IExpense>;
  counter = 0;
  uniqueString = "EXP";
  constructor(private firestore: AngularFirestore, private db: AngularFireDatabase ) { }


  createExpense(expense:any) {

   const promise= this.firestore.collection<IExpense>('expenses').snapshotChanges().toPromise();
   promise.then((data)=>{
    console.log("Promise resolved with counts " , data.length);
    this.counter = data.length;
  })
  expense.uniqueId = this.uniqueString + this.counter;
  this.firestore.collection<IExpense>('expenses').add(expense);
  }

  getExpenses() {
    return this.firestore.collection<IExpense>('expenses').snapshotChanges();
  }

  getExpenses2(expenid) {
    
    return  this.firestore.doc(`expenses/${expenid}`).valueChanges();
  }

  

  
  // updateExpense(expenseId,expense){
  //   this.firestore.doc('expenses/' + expenseId).update(expense);
  // }

  updateItem(expense: any ){
    console.log("update from service");
    this.expenseDoc = this.firestore.doc('expenses/' + expense.expenseId);
    this.expenseDoc.update(expense);
  }
  
  deleteExpense(expenseId) {
    console.log("service delete expense");
      this.firestore.doc('expenses/' + expenseId).delete();
    }
    
}