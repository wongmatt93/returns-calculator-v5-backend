export interface StockTransaction {
  quantity: number;
  cost: number;
  date: string;
}

export interface OptionTransaction {
  quantity: number;
  type: string;
  transactionDate: string;
  callPut: string;
  strike: number;
  expirationDate: string;
  premium: number;
}

export interface DividendTransaction {
  amount: number;
  date: string;
}

export interface Stock {
  ticker: string;
  stockTransactions: StockTransaction[];
  optionTransactions: OptionTransaction[];
  dividendTransactions: DividendTransaction[];
}
