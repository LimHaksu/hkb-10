import Observable from "./Observable";

export type Date = {
  year: number;
  month: number;
};

class RootModel extends Observable {
  private year: number;
  private month: number;

  constructor() {
    super();
    const now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;
  }

  setDate(date: { year: number; month: number }) {
    this.year = date.year;
    this.month = date.month;
    this.notify({
      year: this.year,
      month: this.month,
    });
  }

  getYear(): number {
    return this.year;
  }

  getMonth(): number {
    return this.month;
  }

  nextMonth(): void {
    this.month += 1;
    if (this.month === 13) {
      this.year += 1;
      this.month = 1;
    }

    const date: Date = {
      year: this.year,
      month: this.month,
    };

    this.notify(date);
  }

  prevMonth(): void {
    this.month -= 1;
    if (this.month === 0) {
      this.year -= 1;
      this.month = 12;
    }

    const date: Date = {
      year: this.year,
      month: this.month,
    };

    this.notify(date);
  }
}

export default new RootModel();
