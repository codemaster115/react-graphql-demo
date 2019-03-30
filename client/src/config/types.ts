export type Bank = {
  id: number;
  name: string;
};

export type Branch = {
  id: number;
  name: string;
};

export type BankUser = {
  id: number;
  accountHolderName: string;
  employeeName: string;
  bank: Bank;
  branch: Branch;
  accountType: string;
  accountNumber: string;
  employeeNumber: string;
  lastUpdated: Date;
  [key: string]: any;
};

export type BankUserInput = {
  accountHolderName: string;
  employeeName: string;
  bank: number;
  branch: number;
  accountType: string;
  accountNumber: string;
  employeeNumber: string;
};
