import Component from "../Component";

import PieChartModel from "../../models/PieChartModel";

import { CategoryInfo } from "../../fetch/getCategoryOutcome";

import "./StickGraph.scss";

type PieChartSize = {
  width: number;
  height: number;
};

type Color = {
  R: number;
  G: number;
  B: number;
};

type Data = {
  value: number;
  title: string;
};

function makeColorCode(start: Color, diff: Color, index: number): string {
  const R = Math.floor(start.R + diff.R * index).toString(16);
  const G = Math.floor(start.G + diff.G * index).toString(16);
  const B = Math.floor(start.B + diff.B * index).toString(16);

  return `#${R}${G}${B}`;
}

export default class StickGraph extends Component {
  private _size: PieChartSize;
  private _startColor: Color;
  private _endColor: Color;

  private $ul: HTMLUListElement;

  constructor(width: number, height: number) {
    super();

    this._size = {
      width: width | 800,
      height: height | 600,
    };

    this._startColor = {
      R: 52,
      G: 152,
      B: 219,
    };

    this._endColor = {
      R: 210,
      G: 180,
      B: 222,
    };

    this.view = document.createElement("div");
    this.view.className = "stick_graph";

    const mainHr = document.createElement("hr");
    mainHr.className = "main_line";
    this.$ul = document.createElement("ul");

    this.view.appendChild(mainHr);
    this.view.appendChild(this.$ul);

    PieChartModel.subscribe("changeStickData", (data: CategoryInfo[]) => {
      this.setView(data);
    });
  }

  setView(data: Data[]): void {
    // SAFE GUARD!!
    if (data.length === 0) {
      return;
    }

    const total = data.reduce((pre, cur) => {
      return pre + cur.value;
    }, 0);
    const diff = {
      R: (this._endColor.R - this._startColor.R) / data.length,
      G: (this._endColor.G - this._startColor.G) / data.length,
      B: (this._endColor.B - this._startColor.B) / data.length,
    };
    const barWidth = this._size.width * 0.6;

    const arr: string[] = [];
    data.forEach((cur, index) => {
      const color = makeColorCode(this._startColor, diff, index);
      const percent = (cur.value / total) * 100;
      const content = /* html */ `<li>
<div class="category">
  <p>${cur.title}</p>
</div>
<div class="percent">
  <p>${percent.toFixed(2)}%</p>
</div>
<div class="graph">
  <div class="bar" data-percent=${percent} style="background-color: ${color};"></div>
</div>
<div class="amount">
  <p>${cur.value.toLocaleString()}원</p>
</div>
</li>`;

      arr.push(content);
    });

    this.$ul.innerHTML = arr.join("\n<hr />\n");

    const arrBar: NodeListOf<HTMLDivElement> = this.$ul.querySelectorAll(
      "div.bar"
    );

    Array.from(arrBar).forEach((stick, index) => {
      setTimeout(() => {
        const percent = Number(stick.dataset.percent);
        stick.style.width = `${(percent / 100) * barWidth}px`;
      }, (1000 / data.length) * index);
    });
  }
}
