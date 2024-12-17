export class WorkingHours {
  constructor(db) {
    this.db = db;
  }

  async createWorkingHours(jobId) {
    let qry = `INSERT INTO working_hours (job_id, day, hour, emergency) VALUES `;

    for (let day = 1; day < 8; day++) {
      for (let hour = 0; hour < 24; hour++) {
        qry += `(${jobId}, ${day}, ${hour}, false)`;
        if (day != 7 || hour != 23) qry += `,`;
      }
    }

    qry += `RETURNING *;`;

    const workingHours = await this.db.query(qry);
    return workingHours.rows;
  }

  async updateWorkingHour({ jobId, day, hour, available, emergency }) {
    let qry = `UPDATE working_hours SET available=${available}, emergency=${emergency} WHERE job_id=${jobId} AND day=${day} AND hour=${hour}`;

    const updated = await this.db.query(qry);
    return !!updated.rowCount;
  }

  async deleteWorkingHoursByJobId(jobId) {
    const qry = `DELETE FROM working_hours WHERE job_id=${jobId};`;
    const jobs = await this.db.query(qry);
    return !!jobs.rowCount;
  }
}
