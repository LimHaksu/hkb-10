class History {
  id: number;
  date: Date;
  category: string;
  paymentMethod: string;
  income: boolean;
  amount: number;
  detail: string;

  constructor(
    id: number,
    date: Date,
    category: string,
    paymentMethod: string,
    income: boolean,
    amount: number,
    detail: string
  ) {
    this.id = id;
    this.date = date;
    this.category = category;
    this.paymentMethod = paymentMethod;
    this.income = income;
    this.amount = amount;
    this.detail = detail;
  }
}

export default History;
