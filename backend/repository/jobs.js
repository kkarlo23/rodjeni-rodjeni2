export class Jobs {
  constructor(db) {
    this.db = db;
  }

  async getJobById(jobId) {
    const qry = `SELECT * FROM jobs WHERE id=${jobId};`;
    const jobs = await this.db.query(qry);
    return jobs.rows[0];
  }

  async createJob({ user_id, description, category_id, municipality_id }) {
    const qry = `INSERT INTO jobs (user_id, description, category_id, municipality_id)
                VALUES (${user_id}, '${description}', ${category_id}, ${municipality_id})
                RETURNING *;`;
    const jobs = await this.db.query(qry);
    return jobs.rows[0];
  }

  async deleteJobById(jobId) {
    const qry = `DELETE FROM jobs WHERE id=${jobId};`;
    const jobs = await this.db.query(qry);
    return !!jobs.rowCount;
  }
}
