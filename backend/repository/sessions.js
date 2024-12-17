import dayjs from "dayjs";

export class Sessions {
  constructor(db) {
    this.db = db;
  }

  async createSession(userId) {
    const expires_at = dayjs().add(1, "day").toISOString();

    const qry = `INSERT INTO sessions (user_id, expires_at)
                VALUES ('${userId}', '${expires_at}')
                RETURNING *;`;
    const session = await this.db.query(qry);
    return session.rows[0];
  }

  async sessionOk(uuid) {
    const qry = `SELECT * FROM sessions WHERE "uuid"  = '${uuid}' and NOW() < expires_at;`;
    const session = await this.db.query(qry);
    return session.rows[0];
  }
}
