import Component, { ComponentOption } from "../Component";

interface HistoryItemOption extends ComponentOption {
  category: string;
  detail: string;
  paymentMethod: string;
  amount: number;
}

class HistoryItem extends Component {
  constructor(option: HistoryItemOption) {
    super("div", option);

    this.setInnerHtml(
      `<span class="history-item-category">
    ${option.category}
</span>
<span class="history-item-category">
    ${option.detail}
</span>
<span class="history-item-payment-method">
    ${option.paymentMethod}
</span>
<span class="history-item-amount">
    ${option.amount}
</span>`
    );
  }
}

export default HistoryItem;
