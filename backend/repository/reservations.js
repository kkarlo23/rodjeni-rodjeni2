export class Reservations {
  constructor(db) {
    this.db = db;
  }

  async getReservationsByJobId(jobId) {
    const qry = `SELECT r.id, r.working_hour_id, TO_CHAR(date, 'YYYY-MM-DD') as date, user_id, accepted, completed from  reservations r
                JOIN working_hours wh ON r.working_hour_id = wh.id
                WHERE wh.job_id = ${jobId};`;

    const reservation = await this.db.query(qry);
    return reservation.rows;
  }

  async createReservation({ user_id, working_hour_id, date }) {
    const qry = `INSERT INTO reservations (user_id, working_hour_id, date)
                VALUES (${user_id}, ${working_hour_id}, '${date}')
                RETURNING *`;

    const reservation = await this.db.query(qry);
    return reservation.rows[0];
  }

  async updateReservationStatus({ reservationId, accepted }) {
    const qry = `UPDATE reservations SET accepted = ${accepted} WHERE id=${reservationId} RETURNING *;`;
    const reservation = await this.db.query(qry);
    return reservation.rows[0];
  }

  async completeReservation({ reservationId }) {
    const qry = `UPDATE reservations SET completed = true WHERE id=${reservationId} RETURNING *;`;
    const reservation = await this.db.query(qry);
    return reservation.rows[0];
  }
}
