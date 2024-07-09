const express = require('express');
const orgController = require('../controllers/orgController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, orgController.getOrganisations);
router.get('/:orgId', authMiddleware, orgController.getOrganisation);
router.post('/', authMiddleware, orgController.createOrganisation);
router.post('/:orgId/users', authMiddleware, orgController.addUserToOrganisation);

module.exports = router;