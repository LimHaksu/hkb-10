import Component from "../Component";
import "./Calendar.scss";

import RootModel from "../../models/RootModel";
import CalendarModel from "../../models/CalendarModel";

import { DateInfo, DateData } from "../../fetch/getDailyHistories";

const calendarHTML = /* html */ `<thead>
    <tr>
      <th scope="col">일</th>
      <th scope="col">월</th>
      <th scope="col">화</th>
      <th scope="col">수</th>
      <th scope="col">목</th>
      <th scope="col">금</th>
      <th scope="col">토</th>
    </tr>
  </thead>
  <tbody></tbody>
`;

function daysInMonth(year: number, month: number) {
  return new Date(year, month, -1).getDate() + 1;
}

function getLastMonth(year: number, month: number) {
  return {
    year: month === 1 ? year - 1 : year,
    month: month === 1 ? 12 : month - 1,
  };
}

function numberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default class Calendar extends Component {
  $tbody: HTMLTableSectionElement;
  year: number;
  month: number;

  constructor() {
    super();
    this.year = RootModel.getYear();
    this.month = RootModel.getMonth();

    this.view = document.createElement("table");
    this.view.className = "calendar";

    this.view.innerHTML = calendarHTML;

    this.$tbody =
      this.view.querySelector("tbody") || document.createElement("tbody");

    CalendarModel.subscribe("changeCalendarContent", (data: DateData) => {
      this.changeDate(data.year, data.month);
      this.setCalendar(data.data);
    });
  }

  changeDate(year: number, month: number): void {
    this.year = year;
    this.month = month;

    this.setCalendar();
  }

  setCalendar(data?: DateInfo[]): void {
    if (!this.$tbody) {
      return;
    }

    const tbody = this.$tbody;
    tbody.innerHTML = ``;
    const { year, month } = this;

    const startDay = new Date(`${year}-${month}`).getDay();
    const currentMonthDays = daysInMonth(year, month);

    const lastMonth = getLastMonth(year, month);
    const lastMonthDays = daysInMonth(lastMonth.year, lastMonth.month);

    let dataIndex = 0;

    let beforeCount = lastMonthDays - (startDay - 1);
    let dayCount = 1;
    let newCount = 1;
    for (let i = 0; i < 6; i++) {
      if (dayCount > currentMonthDays) {
        break;
      }

      const tr = document.createElement("tr");

      for (let day = 0; day < 7; day++) {
        const td = document.createElement("td");

        if (day < startDay && beforeCount <= lastMonthDays) {
          td.innerHTML = `<label>${beforeCount}</label><div></div>`;

          td.className = "null";
          beforeCount += 1;
        } else if (dayCount <= currentMonthDays) {
          const content = document.createElement("div");

          if (
            data &&
            dataIndex < data.length &&
            data[dataIndex].day === dayCount
          ) {
            const curData = data[dataIndex];

            if (curData.outcome) {
              content.innerHTML += `<p class="outcome">-${numberWithCommas(
                curData.outcome
              )}</p>`;
            }
            if (curData.income) {
              content.innerHTML += `<p class="income">${numberWithCommas(
                curData.income
              )}</p>`;
            }

            dataIndex += 1;
          }

          td.innerHTML = `<label>${dayCount}</label>`;
          td.appendChild(content);

          dayCount += 1;
        } else {
          td.innerHTML = `<label>${newCount}</label><div></div>`;

          td.className = "null";
          newCount += 1;
        }
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }
  }

  hideContent(income: boolean, outcome: boolean): void {
    const hideIncome = "hide_income";
    const hideOutcome = "hide_outcome";

    if (!income) {
      this.$tbody?.classList.add(hideIncome);
    } else {
      this.$tbody?.classList.remove(hideIncome);
    }

    if (!outcome) {
      this.$tbody?.classList.add(hideOutcome);
    } else {
      this.$tbody?.classList.remove(hideOutcome);
    }
  }

  reRender(): void {
    this.setCalendar();
  }
}
