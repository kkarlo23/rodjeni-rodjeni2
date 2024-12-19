export class Counties {
  constructor(db) {
    this.db = db;
  }

  async getCounties() {
    const qry = `SELECT * FROM counties;`;
    const counties = await this.db.query(qry);
    return counties.rows;
  }
}
