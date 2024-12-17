export class Users {
  constructor(db) {
    this.db = db;
  }

  async createUser({ username, password, full_name, email, phone }) {
    const qry = `INSERT INTO users (username, password, full_name, email, phone)
                VALUES ('${username}', '${password}', '${full_name}', '${email}', '${phone}')
                RETURNING id, username, full_name, email, phone, role;`;
    const user = await this.db.query(qry);
    return user.rows[0];
  }

  async usernameExists(username) {
    const qry = `SELECT * FROM users WHERE username = '${username}'`;
    const user = await this.db.query(qry);
    return !!user.rows.length;
  }

  async getUserForLogin(username) {
    const qry = `SELECT * FROM users WHERE username = '${username}' AND deleted = false`;
    const user = await this.db.query(qry);
    return user.rows[0];
  }

  async changePassword(userId, newPassword) {
    const qry = `UPDATE users SET password = '${newPassword}' WHERE id = '${userId}';`;
    const updated = await this.db.query(qry);
    return !!updated.rowCount;
  }

  async updateUser(userId, userData) {
    const fields = Object.keys(userData).filter((k) => userData[k]);

    let qry = `UPDATE users SET `;
    for (const [i, field] of fields.entries()) {
      qry += `${field} = '${userData[field]}'`;

      if (i != fields.length - 1) qry += ", ";
    }

    qry += ` WHERE id = ${userId} RETURNING id, username, full_name, email, phone, role;`;
    const users = await this.db.query(qry);
    return users.rows[0];
  }
}
