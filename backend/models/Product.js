const pool = require('../config/database');

class Product {
  static async findAll() {
    const query = `
      SELECT 
        p.*,
        u.username,
        u.email,
        c.name as category_name,
        c.icon as category_icon
      FROM products p
      JOIN users u ON p.user_id = u.id
      JOIN categories c ON p.category_id = c.id
      ORDER BY p.id DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT 
        p.*,
        u.username,
        u.email,
        c.name as category_name,
        c.icon as category_icon
      FROM products p
      JOIN users u ON p.user_id = u.id
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = `
      SELECT 
        p.*,
        c.name as category_name,
        c.icon as category_icon
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.user_id = $1
      ORDER BY p.id DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async create(productData) {
    const { title, price, description, image_url, user_id, category_id } = productData;
    const query = `
      INSERT INTO products (title, price, description, image_url, user_id, category_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const result = await pool.query(query, [title, price, description, image_url, user_id, category_id]);
    return result.rows[0];
  }

  static async update(id, productData, userId) {
    const { title, price, description, image_url, category_id } = productData;
    const query = `
      UPDATE products 
      SET title = $1, price = $2, description = $3, image_url = $4, category_id = $5
      WHERE id = $6 AND user_id = $7
      RETURNING *
    `;
    const result = await pool.query(query, [title, price, description, image_url, category_id, id, userId]);
    return result.rows[0];
  }

  static async delete(id, userId) {
    const query = 'DELETE FROM products WHERE id = $1 AND user_id = $2 RETURNING *';
    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  }
}

module.exports = Product;
