import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';


import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { ExpenseDialogComponent } from './shared/expense-dialog/expense-dialog.component';
import {MatConfirmDialogComponent} from './shared/mat-confirm-dialog/mat-confirm-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    ExpenseListComponent,
    ExpenseComponent,
    FooterComponent,
    HeaderComponent,
    ExpenseDialogComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'ExpenseReimbursementApp'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
    
  ],
  
  bootstrap: [AppComponent],
  entryComponents: [ExpenseComponent, MatConfirmDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
