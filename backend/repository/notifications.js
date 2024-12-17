export class Notifications {
  constructor(db) {
    this.db = db;
  }

  async getUserNotifications(userId) {
    const qry = `SELECT * FROM notifications WHERE user_id = ${userId};`;
    const notifications = await this.db.query(qry);
    return notifications.rows;
  }
}
