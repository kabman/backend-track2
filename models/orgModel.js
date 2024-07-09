const pool = require('../config/db');

const createOrgTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS organisations (
      orgId SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      userId INTEGER REFERENCES users(userId)
    );
  `;
  await pool.query(query);
};

module.exports = { createOrgTable };