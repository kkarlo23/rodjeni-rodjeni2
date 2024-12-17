export class Notifications {
  constructor(db) {
    this.db = db;
  }

  async createNotification({ user_id, content }) {
    const qry = `INSERT INTO notifications (user_id, content)
                VALUES (${user_id}, '${content}')
                RETURNING *;`;
    const user = await this.db.query(qry);
    return user.rows[0];
  }

  async getUserNotifications(userId) {
    const qry = `SELECT * FROM notifications WHERE user_id = ${userId};`;
    const notifications = await this.db.query(qry);
    return notifications.rows;
  }
}
