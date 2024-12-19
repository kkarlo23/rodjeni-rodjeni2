export class Municipalities {
  constructor(db) {
    this.db = db;
  }

  async getMunicipalities() {
    const qry = `SELECT * FROM municipalities;`;
    const municipalities = await this.db.query(qry);
    return municipalities.rows;
  }
}
