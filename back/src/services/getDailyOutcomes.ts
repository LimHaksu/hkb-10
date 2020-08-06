import History from "../daos/dto/History";
import historyDao from "../daos/HistoryDAO";

type DateInfo = {
  date: number;
  amount: number;
};

type DataType = {
  year: number;
  month: number;
  dates: DateInfo[];
};

function getDateOfMonth(year: number, month: number) {
  return new Date(year, month, -1).getDate() + 1;
}

export default async function getCalenderData(
  year: number,
  month: number
): Promise<DataType> {
  const histories: History[] = await historyDao.getHistories(
    `${year}`,
    `${month}`
  );

  const returnObject: DataType = {
    year: year,
    month: month,
    dates: [],
  };

  const dateOfMonth = getDateOfMonth(year, month);
  for (let date = 1; date <= dateOfMonth; date++) {
    returnObject.dates.push({
      date: date,
      amount: 0,
    });
  }

  histories.forEach((cur) => {
    const date = cur.date.getDate();
    const outcome = cur.income ? 0 : cur.amount;

    returnObject.dates[date - 1].amount += outcome / 10000;
  });

  return returnObject;
}
