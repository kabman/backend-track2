const pool = require('../config/db');

exports.getOrganisations = async (req, res) => {
  try {
    const userId = req.user.id;
    const orgs = await pool.query('SELECT * FROM organisations WHERE userId = $1', [userId]);
    res.status(200).json({
      status: 'success',
      message: 'Organisations retrieved successfully',
      data: {
        organisations: orgs.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getOrganisation = async (req, res) => {
  try {
    const { orgId } = req.params;
    const org = await pool.query('SELECT * FROM organisations WHERE orgId = $1', [orgId]);

    if (!org.rows.length) {
      return res.status(404).json({ message: 'Organisation not found', statusCode: 404 });
    }

    res.status(200).json({
      status: 'success',
      message: 'Organisation retrieved successfully',
      data: org.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createOrganisation = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  try {
    const orgResult = await pool.query(
      'INSERT INTO organisations (name, description, userId) VALUES ($1, $2, $3) RETURNING *',
      [name, description, userId]
    );

    res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: orgResult.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addUserToOrganisation = async (req, res) => {
  const { userId } = req.body;
  const { orgId } = req.params;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE userId = $1', [userId]);

    if (!userExists.rows.length) {
      return res.status(404).json({ message: 'User not found', statusCode: 404 });
    }

    await pool.query(
      'UPDATE organisations SET userId = $1 WHERE orgId = $2',
      [userId, orgId]
    );

    res.status(200).json({
      status: 'success',
      message: 'User added to organisation successfully',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
