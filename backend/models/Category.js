const pool = require('../config/database');

class Category {
  static async findAll() {
    const query = 'SELECT * FROM categories ORDER BY name';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM categories WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(categoryData) {
    const { name, icon } = categoryData;
    const query = `
      INSERT INTO categories (name, icon)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await pool.query(query, [name, icon]);
    return result.rows[0];
  }
}

module.exports = Category;
