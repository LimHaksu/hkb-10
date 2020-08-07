class PaymentMethod {
  id: number;
  value: number;
  name: string;

  constructor(id: number, value: number, name: string, userId?: string) {
    this.id = id;
    this.value = value;
    this.name = name;
  }
}

export default PaymentMethod;
