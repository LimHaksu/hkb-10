const ANIMATION_TIME = 3;
const ANIMATION_CALC = `keySplines="
0.1 0.8 0.2 1;
0.1 0.8 0.2 1;
0.1 0.8 0.2 1;
0.1 0.8 0.2 1"
keyTimes="
0;0.1;0.2;0.88;1"
calcMode="spline"`;

export type DateData = { date: number; amount: number };
export type GraphSize = {
  width: number;
  height: number;
  top: number;
  bottom: number;
};

export function getStandards(
  dateArray: DateData[]
): { array: number[]; average: number } {
  if (dateArray.length === 0) {
    return { array: [0], average: 0 };
  }

  let max = dateArray[0].amount;
  let min = dateArray[0].amount;
  let sum = 0;

  dateArray.forEach((cur) => {
    max = Math.max(cur.amount, max);
    min = Math.min(cur.amount, min);
    sum += cur.amount;
  });

  const start = Math.floor(min / 5) * 5;
  const end = Math.ceil(max / 5) * 5;

  const arr = [];
  for (let i = start; i <= end; i += 5) {
    arr.push(i);
  }

  const average = Math.floor(sum / dateArray.length);

  return { array: arr, average: average };
}

export function createAverageLine(
  average: number,
  first: number,
  last: number,
  size: GraphSize
): string {
  const graphHeight = size.height - size.top - size.bottom;

  const percent = Math.floor(((average - first) / (last - first)) * 100);

  const averageY = (1 - percent / 100) * graphHeight + size.top;

  return /*html*/ `<line x1="80" x2="720" y1="${averageY}" y2="${averageY}" stroke-dasharray="5,5" stroke-width="2">
    <animate attributeName="y1" begin="0s" dur="${ANIMATION_TIME}s"
    from="${graphHeight + size.top}" to="${averageY}" ${ANIMATION_CALC}/>
    <animate attributeName="y2" begin="0s" dur="${ANIMATION_TIME}s"
    from="${graphHeight + size.top}" to="${averageY}" ${ANIMATION_CALC}/>
  </line>
  <text y="${averageY}" x="720" class="average">이번달 평균
    <animate attributeName="y" begin="0s" dur="${ANIMATION_TIME}s"
    from="${graphHeight + size.top}" to="${averageY}" ${ANIMATION_CALC}/>
  </text>`;
}

export function createStandardsLine(
  dateArray: number[],
  size: GraphSize
): string[] {
  const elements: string[] = [];
  const graphHeight = size.height - size.top - size.bottom;
  const standard = Math.floor(graphHeight / (dateArray.length - 1));

  dateArray.forEach((cur, index) => {
    const curY = graphHeight - index * standard + size.top;
    const template = /*html*/ `<line x1="80" x2="720" y1="${curY}" y2="${curY}"></line>`;
    elements.push(template);
  });

  return elements;
}

export function createStandards(
  dateArray: number[],
  size: GraphSize
): string[] {
  const elements: string[] = [];
  const graphHeight = size.height - size.top - size.bottom;
  const standard = Math.floor(graphHeight / (dateArray.length - 1));

  dateArray.forEach((cur, index) => {
    const curY = graphHeight - index * standard + size.top;
    const template = /*html*/ `<text x="50" y="${curY}">${cur}${
      cur === 0 ? "" : "만"
    }</text>`;
    elements.push(template);
  });

  return elements;
}

export function createDateStandards(
  year: number,
  month: number,
  size: GraphSize
): string[] {
  const arr: string[] = [];
  const dateCount = new Date(year, month, -1).getDate() + 1;

  for (let date = 1; date <= dateCount; date += 5) {
    const template = /*html*/ `<text x="${(arr.length + 1) * 100}" y="${
      size.height - 20
    }">${month}.${date}</text>`;
    arr.push(template);
  }

  return arr;
}

export function createDots(
  dateArray: DateData[],
  first: number,
  last: number,
  size: GraphSize
): string[] {
  const arr: string[] = [];

  const graphHeight = size.height - size.top - size.bottom;

  dateArray.forEach((cur, index) => {
    const percent = Math.floor(((cur.amount - first) / (last - first)) * 100);

    const curY = (1 - percent / 100) * graphHeight + size.top;

    const template = /*html*/ `<circle cx="${
      100 + index * 20
    }" cy="${curY}" r="5">
    <animate attributeName="cy" begin="0s" dur="${ANIMATION_TIME}s"
    from="${graphHeight + size.top}" to="${curY}" ${ANIMATION_CALC}/>
  </circle>`;

    arr.push(template);
  });

  return arr;
}

function creatPoints(
  dateArray: DateData[],
  first: number,
  last: number,
  size: GraphSize
) {
  const arr: string[] = [];

  const graphHeight = size.height - size.top - size.bottom;

  dateArray.forEach((cur, index) => {
    const percent = Math.floor(((cur.amount - first) / (last - first)) * 100);

    const curY = Math.ceil((1 - percent / 100) * graphHeight + size.top);

    const template = `${100 + index * 20}, ${curY}`;

    arr.push(template);
  });

  return arr;
}

function createZeroPoints(dateArray: DateData[], size: GraphSize) {
  const arr: string[] = [];
  const graphHeight = size.height - size.top - size.bottom;

  dateArray.forEach((cur, index) => {
    const template = `${100 + index * 20}, ${size.top + graphHeight}`;

    arr.push(template);
  });

  return arr;
}

export function createPolyLine(
  dataArray: DateData[],
  first: number,
  last: number,
  size: GraphSize
): string {
  const template = /*html*/ `<polyline points="${creatPoints(
    dataArray,
    first,
    last,
    size
  )}"
>
  <animate attributeName="points" delay="2s" begin="0s" dur="${ANIMATION_TIME}s"
    from="${createZeroPoints(dataArray, size)}"
    to="${creatPoints(dataArray, first, last, size)}"
    ${ANIMATION_CALC}
  />
</polyline>`;

  return template;
}
