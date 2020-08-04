import mysql from "mysql2/promise";
import DAO from "./DataAccessObject";
import pool from "./constants/poolOptions";
import PaymentMethod from "./dto/PaymentMethod";

const SELECT_PAYMENT_METHOD = `SELECT * FROM payment_methods`;

class PaymentMethodDAO extends DAO {
  constructor(option: mysql.PoolOptions) {
    super(option);
  }

  async getPaymentMethods() {
    const connection = await this.getConnection();
    const paymentMethods: PaymentMethod[] = [];

    try {
      await connection.beginTransaction();
      // SELECT payment methods
      const row = await this.executeQuery(
        connection,
        SELECT_PAYMENT_METHOD,
        []
      );

      if (row instanceof Array) {
        let value = 0;
        row.forEach((paymentMethod: any) => {
          const { name } = paymentMethod;
          value++;
          paymentMethods.push(new PaymentMethod(value, name));
        });
      }
      await connection.commit();
    } catch (error) {
      console.log(error);
      connection.rollback();
    } finally {
      connection.release();
    }

    return paymentMethods;
  }
}

export default new PaymentMethodDAO(pool.production);
