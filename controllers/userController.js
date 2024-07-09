const pool = require('../config/db');

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM users WHERE userId = $1', [id]);

    if (!user.rows.length) {
      return res.status(404).json({ message: 'User not found', statusCode: 404 });
    }

    res.status(200).json({
      status: 'success',
      message: 'User retrieved successfully',
      data: user.rows[0]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};