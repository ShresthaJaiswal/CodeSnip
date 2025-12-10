const express = require('express');
const router = express.Router();
const { autoTag, smartSearch } = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');

// All AI routes require authentication and have rate limiting
router.use(authMiddleware);
router.use(aiLimiter);

router.post('/auto-tag', autoTag);
router.post('/smart-search', smartSearch);

module.exports = router;
