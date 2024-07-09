
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const orgRoutes = require('./routes/orgRoutes');
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const userModel = require('./models/userModel');
const orgModel = require('./models/orgModel');

// Before starting your server, add these lines:
async function initializeTables() {
  await userModel.createUserTable();
  await orgModel.createOrgTable();
}

app.use('/auth', authRoutes);
app.use('/api/organisations', orgRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the User Auth Org API');
});

app.use((err, req, res, next) => {
  console.error('Error details:', err);
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

initializeTables().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize tables:', err);
  process.exit(1);
});

module.exports = app;