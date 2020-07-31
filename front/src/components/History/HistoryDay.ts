import Component, { ComponentOption } from "../Component";
import "./HistoryDay.scss";

interface HistoryDayOption extends ComponentOption {
  month: number;
  day: number;
  weekDay: string;
  totalIncome: number;
  totalOutcome: number;
}

class HistoryDay extends Component {
  constructor(option: HistoryDayOption) {
    super("div", option);

    const { month, day, weekDay, totalIncome, totalOutcome } = option;

    this.setInnerHtml(
      `<span class="history-day-first">
    <span class="history-day-month">
        ${month} 월
    </span>
    <span class="history-day-day">
        ${day} 일
    </span>
    <span class="history-day-week-day">
        ${weekDay}
    </span>
</span>
<span class="history-day-second">
    <span class="history-day-total-income">
        +${totalIncome}원
    </span>
    <span class="history-day-total-outcome">
        -${totalOutcome}원
    </span>
</span>`
    );
  }
}

export default HistoryDay;
