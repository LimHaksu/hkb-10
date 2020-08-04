import mysql from "mysql2/promise";
import DAO from "./DataAccessObject";
import pool from "./constants/poolOptions";
import History from "./dto/History";

interface HistoryDataType {
  id?: number;
  year: number;
  month: number;
  day: number;
  category: string;
  paymentMethod: string;
  income: boolean;
  amount: number;
  detail: string;
}

const SELECT_HISTORY = `SELECT h.id id, h.date date, c.content category, h.content detail, h.payment payment, h.amount amount, h.is_income is_income
FROM histories h
JOIN categories c ON h.pk_category = c.id
WHERE h.date BETWEEN ? AND ?
ORDER BY h.date ASC`;

const INSERT_HISTORY = `INSERT INTO histories (pk_user, date, pk_category, payment, amount, content, is_income)
VALUES (?, ?, ?, ?, ?, ?, ?)`;

const UPDATE_HISTORY = `UPDATE histories SET pk_user=?, date=?, pk_category=?, payment=?, amount=?, content=?, is_income=?
WHERE id=?`;

class HistoryDAO extends DAO {
  constructor(option: mysql.PoolOptions) {
    super(option);
  }

  getEndDay(month: number) {
    const endDays = [
      "0",
      "31",
      "29",
      "31",
      "30",
      "31",
      "30",
      "31",
      "31",
      "30",
      "31",
      "30",
      "31",
    ];
    return endDays[month];
  }

  async getHistories(year: string, month: string) {
    const connection = await this.getConnection();
    let histories: History[] = [];

    if (month.length === 1) {
      month = "0" + month;
    }
    const startDay = "01";
    const endDay = this.getEndDay(parseInt(month));

    // 연월 시작일
    const startDate = `${year}-${month}-${startDay}`;
    // 연월 끝일
    const endDate = `${year}-${month}-${endDay}`;
    try {
      await connection.beginTransaction();
      // SELECT Histories
      const row = await this.executeQuery(connection, SELECT_HISTORY, [
        startDate,
        endDate,
      ]);

      if (row instanceof Array) {
        row.forEach((history: any) => {
          const {
            id,
            date,
            category,
            detail,
            payment,
            amount,
            is_income,
          } = history;
          histories.push(
            new History(id, date, category, payment, is_income, amount, detail)
          );
        });
      }
    } catch (error) {
      console.log("에러", error);
      connection.rollback();
    } finally {
      connection.release();
    }

    return histories;
  }

  async createHistory(history: HistoryDataType) {
    const connection = await this.getConnection();
    let result = false;

    try {
      await connection.beginTransaction();
      // INSERT History
      const {
        year,
        month,
        day,
        category,
        paymentMethod,
        amount,
        detail,
        income,
      } = history;
      const date = `${year}-${month}-${day}`;
      const is_income = income ? 1 : 0;
      const firstHistoryeRow = await this.executeQuery(
        connection,
        INSERT_HISTORY,
        [
          "2",
          date,
          category,
          paymentMethod,
          amount.toString(),
          detail,
          is_income.toString(),
        ]
      );

      result = true;
      await connection.commit();
    } catch (error) {
      console.log("에러", error);
      connection.rollback();
    } finally {
      connection.release();
    }

    return result;
  }

  async editHistory(history: HistoryDataType) {
    const connection = await this.getConnection();
    let result = false;

    try {
      await connection.beginTransaction();
      // UPDATE History
      console.log("수정", history);
      const {
        id,
        year,
        month,
        day,
        category,
        paymentMethod,
        amount,
        detail,
        income,
      } = history;
      const date = `${year}-${month}-${day}`;
      const is_income = income ? 1 : 0;
      const firstHistoryeRow = await this.executeQuery(
        connection,
        UPDATE_HISTORY,
        [
          "2",
          date,
          category,
          paymentMethod,
          amount.toString(),
          detail,
          is_income.toString(),
          id!.toString(),
        ]
      );

      result = true;
      await connection.commit();
    } catch (error) {
      console.log("에러", error);
      connection.rollback();
    } finally {
      connection.release();
    }

    return result;
  }
}

export default new HistoryDAO(pool.production);
