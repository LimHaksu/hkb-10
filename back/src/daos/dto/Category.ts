class Category {
  id: number;
  value: number;
  content: string;
  income: boolean;

  constructor(id: number, value: number, content: string, income: boolean) {
    this.id = id;
    this.value = value;
    this.content = content;
    this.income = income;
  }
}

export default Category;
