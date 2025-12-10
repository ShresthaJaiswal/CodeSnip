const { autoTagSnippet, semanticSearch } = require('../utils/openai');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * @route   POST /api/ai/auto-tag
 * @desc    Generate AI suggestions for tags and description
 * @access  Private
 */
const autoTag = async (req, res, next) => {
  try {
    const { code, language, title } = req.body;

    if (!code || !language || !title) {
      return res.status(400).json({
        success: false,
        message: 'Code, language, and title are required'
      });
    }

    const suggestions = await autoTagSnippet(code, language, title);

    res.json({
      success: true,
      message: 'AI suggestions generated successfully',
      data: suggestions
    });
  } catch (error) {
    if (error.message === 'OpenAI API key not configured') {
      return res.status(503).json({
        success: false,
        message: 'AI features are not available. OpenAI API key not configured.'
      });
    }
    next(error);
  }
};

/**
 * @route   POST /api/ai/smart-search
 * @desc    Perform semantic search using AI
 * @access  Private
 */
const smartSearch = async (req, res, next) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    // Get user's snippets
    const snippets = await prisma.snippet.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
        title: true,
        description: true,
        tags: true,
        language: true,
        code: true,
        createdAt: true
      },
      orderBy: { updatedAt: 'desc' }
    });

    if (snippets.length === 0) {
      return res.json({
        success: true,
        message: 'No snippets found',
        data: []
      });
    }

    // Perform semantic search
    const rankedSnippets = await semanticSearch(query, snippets);

    res.json({
      success: true,
      message: 'Smart search completed',
      data: rankedSnippets
    });
  } catch (error) {
    if (error.message === 'OpenAI API key not configured') {
      return res.status(503).json({
        success: false,
        message: 'AI search is not available. OpenAI API key not configured.'
      });
    }
    next(error);
  }
};

module.exports = {
  autoTag,
  smartSearch
};
