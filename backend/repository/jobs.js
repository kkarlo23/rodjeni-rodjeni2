export class Jobs {
  constructor(db) {
    this.db = db;
  }

  async getJobById(jobId) {
    const qry = `SELECT * FROM jobs WHERE id=${jobId};`;
    const jobs = await this.db.query(qry);
    return jobs.rows[0];
  }

  async searchJobs({ category_id, county_id, municipality_id, keyword, user_id }) {
    let qry = `SELECT jobs.id, jobs.user_id, jobs.description, row_to_json(municipalities.*) as municipality, row_to_json(counties.*) as county
                FROM jobs 
                JOIN municipalities ON municipalities.id = jobs.municipality_id
                JOIN counties ON counties.id = municipalities.county_id 
                WHERE 1=1 `;

    if (category_id) {
      qry += `AND category_id=${category_id} `;
    }
    if (county_id) {
      qry += `AND county_id=${county_id} `;
    }
    if (municipality_id) {
      qry += `AND municipality_id=${municipality_id} `;
    }
    if (keyword) {
      qry += `AND description LIKE '%${keyword}%' `;
    }

    qry += `ORDER BY id DESC`;

    const jobs = await this.db.query(qry);
    return jobs.rows;
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
