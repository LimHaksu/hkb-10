import Component, { ComponentOption } from "../Component";
import "./HistoryItem.scss";

interface HistoryItemOption extends ComponentOption {
  income: boolean;
  category: string;
  detail: string;
  paymentMethod: string;
  amount: number;
}

interface TypeData {
  income: boolean;
  amount: number;
}

class HistoryItem extends Component {
  data: TypeData;

  constructor(option: HistoryItemOption) {
    super("div", option);

    const { income, amount } = option;
    this.data = { income, amount };

    this.setInnerHtml(
      `<span class="history-item-category">
    ${option.category}
</span>
<span class="history-item-detail">
    ${option.detail}
</span>
<span class="history-item-payment-method">
    ${option.paymentMethod}
</span>
<span class="history-item-amount ${
        option.income
          ? "history-item-amount-income"
          : "history-item-amount-outcome"
      }">
    ${(option.income ? "+" : "-") + option.amount}
</span>`
    );
  }
}

export default HistoryItem;
