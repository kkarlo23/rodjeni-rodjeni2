export class Categories {
  constructor(db) {
    this.db = db;
  }

  async getCategories() {
    const qry = `SELECT * FROM categories;`;
    const categories = await this.db.query(qry);
    return categories.rows;
  }
}
