import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';
import { ExpenseComponent } from './pages/expense/expense.component';

const routes: Routes = [
  {
    path: "", component:ExpenseListComponent
  },
  {
    path: 'add-expense', component: ExpenseComponent
  },
  {
    path: 'edit/:id', component: ExpenseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
