import { Timestamp } from 'rxjs';

export interface IExpense{
    expenseId: string, //Firebase auto generated ID
    expenseType: string,
    transactionDate: Date,
    businessPurpose: string,
    amount: number,
    receiptStatus: string,
    paymentType: string,
    vendorName: string,
    city: string,
    fileAttr?: string

}