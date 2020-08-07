import mysql from "mysql2/promise";
import DAO from "./DataAccessObject";
import pool from "./constants/poolOptions";
import PaymentMethod from "./dto/PaymentMethod";

const SELECT_PAYMENT_METHOD = `SELECT * FROM payment_methods WHERE pk_user=?`;

const INSERT_PAYMENT_METHOD = `INSERT INTO payment_methods (name, pk_user)
VALUES (?, ?)`;

const DELETE_PAYMENT_METHOD = "DELETE FROM payment_methods WHERE id=?";

class PaymentMethodDAO extends DAO {
  constructor(option: mysql.PoolOptions) {
    super(option);
  }

  async getPaymentMethods(userId: string) {
    const connection = await this.getConnection();
    const paymentMethods: PaymentMethod[] = [];

    try {
      await connection.beginTransaction();
      // SELECT payment methods
      const row = await this.executeQuery(connection, SELECT_PAYMENT_METHOD, [
        userId,
      ]);

      if (row instanceof Array) {
        let value = 0;
        row.forEach((paymentMethod: any) => {
          const { id, name } = paymentMethod;
          value++;
          paymentMethods.push(new PaymentMethod(id, value, name));
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

  async createPaymentMethod(userId: string, paymentMethod: PaymentMethod) {
    const connection = await this.getConnection();
    const paymentMethods: PaymentMethod[] = [];

    try {
      await connection.beginTransaction();
      // INSERT payment methods
      const { name } = paymentMethod;
      const row = await this.executeQuery(connection, INSERT_PAYMENT_METHOD, [
        name,
        userId,
      ]);

      await connection.commit();
    } catch (error) {
      console.log(error);
      connection.rollback();
    } finally {
      connection.release();
    }

    return paymentMethods;
  }

  async removePaymentMethod(paymentMethodId: string) {
    const connection = await this.getConnection();
    let result = false;

    try {
      await connection.beginTransaction();
      // DELETE History
      const row = await this.executeQuery(connection, DELETE_PAYMENT_METHOD, [
        paymentMethodId,
      ]);

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

export default new PaymentMethodDAO(pool.production);
