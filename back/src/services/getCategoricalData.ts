import History from "../daos/dto/History";
import historyDao from "../daos/HistoryDAO";

type CategoryInfo = {
  value: number;
  title: string;
};

export default async function getCategoricalData(
  year: number,
  month: number
): Promise<CategoryInfo[]> {
  const histories: History[] = await historyDao.getHistories(
    `${year}`,
    `${month}`
  );
  const categoryMap = new Map<string, number>();
  const dataArray: CategoryInfo[] = [];

  histories.forEach((cur) => {
    const income = cur.income;

    if (income) {
      return;
    }

    const category = cur.category;
    const amount = cur.amount;

    const newValue = categoryMap.get(category) || 0 + amount;
    categoryMap.set(category, newValue);
  });

  categoryMap.forEach((value, key) => {
    dataArray.push({
      title: key,
      value: value,
    });
  });

  dataArray.sort((a, b) => {
    return a.value < b.value ? 1 : -1;
  });

  return dataArray;
}
