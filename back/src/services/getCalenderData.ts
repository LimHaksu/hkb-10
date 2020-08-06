import History from "../daos/dto/History";
import historyDao from "../daos/HistoryDAO";

type Daily = {
  date: number;
  income: number;
  outcome: number;
};

type Data = {
  year: number;
  month: number;
  data: Daily[];
};

function getDateOfMonth(year: number, month: number) {
  return new Date(year, month, -1).getDate() + 1;
}

export default async function getCalenderData(
  userId: string,
  year: number,
  month: number
): Promise<Data> {
  const histories: History[] = await historyDao.getHistories(
    `${userId}`,
    `${year}`,
    `${month}`
  );

  const returnObject: Data = {
    year: year,
    month: month,
    data: [],
  };

  const dateOfMonth = getDateOfMonth(year, month);
  for (let date = 1; date <= dateOfMonth; date++) {
    returnObject.data.push({
      date: date,
      income: 0,
      outcome: 0,
    });
  }

  histories.forEach((cur) => {
    const date = cur.date.getDate();
    const income = cur.income ? cur.amount : 0;
    const outcome = cur.income ? 0 : cur.amount;

    returnObject.data[date - 1].income += income;
    returnObject.data[date - 1].outcome += outcome;
  });

  return returnObject;
}
