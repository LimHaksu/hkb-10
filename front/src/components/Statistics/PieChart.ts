import Component from "../Component";

import PieChartModel from "../../models/PieChartModel";

import { CategoryInfo } from "../../fetch/getCategoryOutcome";

import "./PieChart.scss";

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

export default class PieChart extends Component {
  private _size: PieChartSize;
  private cx: number;
  private cy: number;
  private r: number;

  private _startColor: Color;
  private _endColor: Color;

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
    this.r = 20;
    this.cx = 50;
    this.cy = 50;

    this.view = document.createElement("div");

    PieChartModel.subscribe("changeData", (data: CategoryInfo[]) => {
      this.setView(data);
    });
  }

  setView(data: Data[]): void {
    // SAFE GUARD!!
    if (data.length === 0) {
      return;
    }

    const r = this.r;
    const cx = this.cx;
    const cy = this.cy;
    const arr: string[] = [];

    data.sort((a, b) => {
      return a.value < b.value ? 1 : -1;
    });

    const diff = {
      R: (this._endColor.R - this._startColor.R) / data.length,
      G: (this._endColor.G - this._startColor.G) / data.length,
      B: (this._endColor.B - this._startColor.B) / data.length,
    };

    const total = data.reduce((pre, cur) => {
      return pre + cur.value;
    }, 0);

    let before = 0;
    data.forEach((cur, index) => {
      const value = cur.value;
      const percentage = before + (value / total) * 100;
      const textPercentage = before + (value / 2 / total) * 100;
      before = percentage;

      const sin = Math.sin((textPercentage / 100) * 2 * Math.PI);
      const cos = Math.cos((textPercentage / 100) * 2 * Math.PI);

      let className = "middle";
      if (sin > 0) {
        className = "left";
      } else if (sin < 0) {
        className = "right";
      }

      const circle = /*html*/ `<circle
    r="${r}"
    stroke="${makeColorCode(this._startColor, diff, index)}"
    data-percent="${percentage}"
    transform="rotate(-90) translate(-${cy} ${cx})"
    style="stroke-width: ${r * 2};"
    ></circle>
    <text transform="translate(${50 - (r + 23) * -sin} ${
        50 - (r + 23) * cos - 1
      })"
    class="${className}"
  >${cur.title}</text>
    <text transform="translate(${50 - (r + 23) * -sin} ${
        50 - (r + 23) * cos + 2
      })"
      class="${className} percent"
    >${((value / total) * 100).toFixed(2)}%</text>
  `;
      arr.push(circle);
    });

    const content = `
    <svg viewbox="0 0 100 100" class="pie" width="${
      this._size.width
    }" height="${this._size.height}">
      ${arr.reverse().join("\n")}
    </svg>`;

    this.view.innerHTML = content;

    this.animate();
  }

  animate(): void {
    const r = this.r;
    const maxLength = 3.14 * (r * 2);
    const circleArr = this.view.querySelectorAll("circle");
    const textArr = this.view.querySelectorAll("text");

    Array.from(circleArr)
      .reverse()
      .forEach((circle, index) => {
        const percentage: number = circle.dataset.percent
          ? Number(circle.dataset.percent)
          : 1;
        const result = (percentage * maxLength) / 100;

        setTimeout(() => {
          circle.style.strokeDasharray = `${result} ${maxLength - result}`;
        }, 100 + index * 100);
      });

    Array.from(textArr)
      .reverse()
      .forEach((text, index) => {
        setTimeout(() => {
          text.style.opacity = `${1}`;
        }, 100 + 200 + index * 100);
      });
  }
}
