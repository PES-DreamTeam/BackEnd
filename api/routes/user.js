const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');
const auth = require('../middlewares/auth');

// api/users
router.get('/', usersController.getAll);

// api/users/:id
router.get('/:id', auth, usersController.getById);

module.exports = router;