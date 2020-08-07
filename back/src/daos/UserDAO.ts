import mysql from "mysql2/promise";
import DAO from "./DataAccessObject";
import pool from "./constants/poolOptions";
import {
  getEncryptedPasswordAndSalt,
  getEncryptedPasswordWithSalt,
} from "../shared/functions";

const SELECT_USER_BY_ID = `SELECT id, password, salt FROM users WHERE id=?`;

const CREATE_USER = `INSERT INTO users (id, password, salt, is_deleted) VALUES (?, ?, ?, 0)`;

class UserDAO extends DAO {
  constructor(option: mysql.PoolOptions) {
    super(option);
  }

  /**
   * 해당하는 아이디가 존재하면 그 아이디를, 없으면 빈 문자열을 리턴함
   * @param userId
   */
  async findUserById(userId: string) {
    const connection = await this.getConnection();
    let result = "";
    try {
      await connection.beginTransaction();
      const row: any = await this.executeQuery(connection, SELECT_USER_BY_ID, [
        userId,
      ]);
      if (row instanceof Array && row.length > 0) {
        const { id } = row[0];
        result = id;
      }

      await connection.commit();
    } catch (error) {
      console.log(error);
      connection.rollback();
    } finally {
      connection.release();
    }
    return result;
  }

  /**
   * 로그인 성공하면 유저의 아이디를 실패하면 빈 문자열을 리턴함
   * @param userId
   * @param password
   */
  async loginUser(userId: string, password: string) {
    const connection = await this.getConnection();
    let result = "";
    try {
      await connection.beginTransaction();
      // id로 salt와 암호화된 패스워드 갖고오고
      const row = await this.executeQuery(connection, SELECT_USER_BY_ID, [
        userId,
      ]);

      if (row instanceof Array) {
        const user = row[0] as any;
        const { salt } = user;
        const passwordInDB = user.password;
        // salt로 암호화된 패스워드 만들고
        const encryptedPassword = await getEncryptedPasswordWithSalt(
          password,
          salt
        );
        // 갖고온 패스워드와 만든 패스워드 같은지 확인
        if (passwordInDB === encryptedPassword) {
          result = userId;
        }
      }
      await connection.commit();
    } catch (error) {
      console.log(error);
      connection.rollback();
    } finally {
      connection.release();
    }
    return result;
  }

  /**
   * 회원가입 성공하면 true, 실패하면 false 리턴
   * @param userId
   * @param password
   */
  async signupUser(userId: string, password: string) {
    const connection = await this.getConnection();
    let result = false;
    try {
      await connection.beginTransaction();
      const { encryptedPassword, salt } = await getEncryptedPasswordAndSalt(
        password
      );
      const row = await this.executeQuery(connection, CREATE_USER, [
        userId,
        encryptedPassword,
        salt,
      ]);
      result = true;
      await connection.commit();
    } catch (error) {
      console.log(error);
      connection.rollback();
    } finally {
      connection.release();
    }
    return result;
  }
}

export default new UserDAO(pool.production);
