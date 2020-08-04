import mysql from "mysql2/promise";
import DAO from "./DataAccessObject";
import pool from "./constants/poolOptions";
import Category from "./dto/Category";

const SELECT_CATEGORY = `SELECT * FROM categories`;

class CategoryDAO extends DAO {
  constructor(option: mysql.PoolOptions) {
    super(option);
  }

  async getCategories() {
    const connection = await this.getConnection();
    const categories: Category[] = [];

    try {
      await connection.beginTransaction();
      // SELECT categories
      const row = await this.executeQuery(connection, SELECT_CATEGORY, []);

      if (row instanceof Array) {
        let incomeValue = 0;
        let outcomValue = 0;
        let value = 0;
        row.forEach((category: any) => {
          const { content, is_income } = category;
          if (is_income === 1) {
            incomeValue++;
            value = incomeValue;
          } else {
            outcomValue++;
            value = outcomValue;
          }
          categories.push(new Category(value, content, is_income));
        });
      }
      await connection.commit();
    } catch (error) {
      console.log(error);
      connection.rollback();
    } finally {
      connection.release();
    }

    return categories;
  }
}

export default new CategoryDAO(pool.production);
