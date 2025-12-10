const express = require('express');
const router = express.Router();
const {
  getSnippets,
  getSnippet,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  shareSnippet,
  getSharedSnippet,
  getStats
} = require('../controllers/snippetController');
const authMiddleware = require('../middleware/auth');
const {
  snippetValidation,
  handleValidationErrors
} = require('../utils/validation');

// Public routes
router.get('/shared/:token', getSharedSnippet);

// Private routes - all require authentication
router.use(authMiddleware);

router.get('/', getSnippets);
router.get('/stats', getStats);
router.get('/:id', getSnippet);
router.post('/', snippetValidation, handleValidationErrors, createSnippet);
router.put('/:id', snippetValidation, handleValidationErrors, updateSnippet);
router.delete('/:id', deleteSnippet);
router.post('/:id/share', shareSnippet);

module.exports = router;
