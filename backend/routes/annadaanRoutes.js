const express = require('express');
const router = express.Router();
const { createAnnadaan, getAnnadaans, updateAnnadaan, getStats } = require('../controllers/annadaanController');
const { validateAnnadaan } = require('../middleware/validationMiddleware');
const optionalAuthMiddleware = require('../middleware/optionalAuthMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/permissionMiddleware');

router.post('/', optionalAuthMiddleware, validateAnnadaan, createAnnadaan);
router.get('/stats', authMiddleware, checkPermission('Annadan'), getStats);
router.get('/', optionalAuthMiddleware, getAnnadaans);
router.put('/:id', authMiddleware, checkPermission('Annadan'), updateAnnadaan);

module.exports = router;
