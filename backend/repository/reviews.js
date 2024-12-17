export class Reviews {
  constructor(db) {
    this.db = db;
  }

  async createReview({ job_id, score, comment }) {
    const qry = `INSERT INTO reviews (job_id, score, comment)
    VALUES (${job_id}, ${score}, '${comment}')
    RETURNING *`;

    const reservation = await this.db.query(qry);
    return reservation.rows[0];
  }
}
