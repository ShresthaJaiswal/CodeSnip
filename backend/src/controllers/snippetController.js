const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

/**
 * @route   GET /api/snippets
 * @desc    Get all snippets for authenticated user
 * @access  Private
 */
const getSnippets = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, language, tags, search } = req.query;
    const skip = (page - 1) * limit;

    // Build where clause
    const where = {
      userId: req.user.id,
      ...(language && { language }),
      ...(tags && { tags: { hasSome: tags.split(',') } }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { code: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    // Get snippets with pagination
    const [snippets, total] = await Promise.all([
      prisma.snippet.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          code: true,
          language: true,
          tags: true,
          isPublic: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.snippet.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        snippets,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/snippets/:id
 * @desc    Get single snippet
 * @access  Private
 */
const getSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;

    const snippet = await prisma.snippet.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: 'Snippet not found'
      });
    }

    res.json({
      success: true,
      data: snippet
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/snippets
 * @desc    Create new snippet
 * @access  Private
 */
const createSnippet = async (req, res, next) => {
  try {
    const { title, description, code, language, tags, isPublic } = req.body;

    const snippet = await prisma.snippet.create({
      data: {
        title,
        description: description || null,
        code,
        language,
        tags: tags || [],
        isPublic: isPublic || false,
        userId: req.user.id
      }
    });

    res.status(201).json({
      success: true,
      message: 'Snippet created successfully',
      data: snippet
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/snippets/:id
 * @desc    Update snippet
 * @access  Private
 */
const updateSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, code, language, tags, isPublic } = req.body;

    // Check if snippet exists and belongs to user
    const existingSnippet = await prisma.snippet.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!existingSnippet) {
      return res.status(404).json({
        success: false,
        message: 'Snippet not found'
      });
    }

    const snippet = await prisma.snippet.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(code && { code }),
        ...(language && { language }),
        ...(tags && { tags }),
        ...(isPublic !== undefined && { isPublic })
      }
    });

    res.json({
      success: true,
      message: 'Snippet updated successfully',
      data: snippet
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/snippets/:id
 * @desc    Delete snippet
 * @access  Private
 */
const deleteSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if snippet exists and belongs to user
    const snippet = await prisma.snippet.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: 'Snippet not found'
      });
    }

    await prisma.snippet.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Snippet deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/snippets/:id/share
 * @desc    Generate share token for snippet
 * @access  Private
 */
const shareSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if snippet exists and belongs to user
    const snippet = await prisma.snippet.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: 'Snippet not found'
      });
    }

    // Generate unique share token
    const shareToken = crypto.randomBytes(16).toString('hex');

    const updatedSnippet = await prisma.snippet.update({
      where: { id },
      data: {
        shareToken,
        isPublic: true
      }
    });

    res.json({
      success: true,
      message: 'Share link generated successfully',
      data: {
        shareToken,
        shareUrl: `${process.env.FRONTEND_URL}/shared/${shareToken}`
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/snippets/shared/:token
 * @desc    Get shared snippet by token
 * @access  Public
 */
const getSharedSnippet = async (req, res, next) => {
  try {
    const { token } = req.params;

    const snippet = await prisma.snippet.findFirst({
      where: {
        shareToken: token,
        isPublic: true
      },
      select: {
        id: true,
        title: true,
        description: true,
        code: true,
        language: true,
        tags: true,
        createdAt: true,
        user: {
          select: {
            username: true,
            name: true
          }
        }
      }
    });

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: 'Snippet not found or not shared'
      });
    }

    res.json({
      success: true,
      data: snippet
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/snippets/stats
 * @desc    Get snippet statistics for user
 * @access  Private
 */
const getStats = async (req, res, next) => {
  try {
    // Get total snippets
    const totalSnippets = await prisma.snippet.count({
      where: { userId: req.user.id }
    });

    // Get snippets by language
    const snippets = await prisma.snippet.findMany({
      where: { userId: req.user.id },
      select: { language: true, tags: true }
    });

    const languageCount = {};
    const tagCount = {};

    snippets.forEach(snippet => {
      // Count languages
      languageCount[snippet.language] = (languageCount[snippet.language] || 0) + 1;

      // Count tags
      snippet.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });

    const topLanguages = Object.entries(languageCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([language, count]) => ({ language, count }));

    const topTags = Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    res.json({
      success: true,
      data: {
        totalSnippets,
        topLanguages,
        topTags
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSnippets,
  getSnippet,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  shareSnippet,
  getSharedSnippet,
  getStats
};
