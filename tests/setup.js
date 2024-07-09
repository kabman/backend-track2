const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Function to clear all tables before each test
const clearTables = async () => {
  await pool.query('DELETE FROM organisations');
  await pool.query('DELETE FROM users');
};

// Function to create sample data for testing
const createSampleData = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword1 = await bcrypt.hash('password123', salt);
  const hashedPassword2 = await bcrypt.hash('password456', salt);

  await pool.query(`
    INSERT INTO users (firstName, lastName, email, password, phone)
    VALUES
    ('John', 'Doe', 'john.doe@example.com', $1, '1234567890'),
    ('Jane', 'Doe', 'jane.doe@example.com', $2, '0987654321')
  `, [hashedPassword1, hashedPassword2]);

  await pool.query(`
    INSERT INTO organisations (name, description, userId)
    VALUES
    ('John\'s Organisation', 'Description of John\'s Org', 1),
    ('Jane\'s Organisation', 'Description of Jane\'s Org', 2)
  `);
};

// Jest setup hook to run before each test
beforeEach(async () => {
  await clearTables();
  await createSampleData();
});

// Jest teardown hook to run after all tests
afterAll(async () => {
  await pool.end();
});

module.exports = {
  clearTables,
  createSampleData,
};