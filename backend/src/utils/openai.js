const OpenAI = require('openai');

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/**
 * Generate tags and description for a code snippet using AI
 * @param {string} code - The code snippet
 * @param {string} language - Programming language
 * @param {string} title - Snippet title
 * @returns {Promise<{tags: string[], description: string}>}
 */
async function autoTagSnippet(code, language, title) {
  if (!openai) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const prompt = `Analyze this ${language} code snippet titled "${title}" and provide:
1. 3-5 relevant tags (single words or short phrases, like "async", "api-call", "error-handling", etc.)
2. A concise 1-2 sentence description of what the code does

Code:
\`\`\`${language}
${code.substring(0, 2000)} // Truncate for token limits
\`\`\`

Respond in JSON format:
{
  "tags": ["tag1", "tag2", "tag3"],
  "description": "Brief description here"
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that analyzes code and generates relevant tags and descriptions. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 200,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    
    return {
      tags: result.tags || [],
      description: result.description || ''
    };
  } catch (error) {
    console.error('OpenAI Auto-tag Error:', error.message);
    throw new Error('Failed to generate AI suggestions');
  }
}

/**
 * Perform semantic search on snippets using AI
 * @param {string} query - Natural language search query
 * @param {Array} snippets - Array of snippets to search through
 * @returns {Promise<Array>} - Ranked snippets
 */
async function semanticSearch(query, snippets) {
  if (!openai) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const prompt = `Given this search query: "${query}"
    
And these code snippets (title | description | tags):
${snippets.slice(0, 20).map((s, i) => `${i + 1}. ${s.title} | ${s.description || 'No description'} | ${s.tags.join(', ')}`).join('\n')}

Return the numbers of the most relevant snippets in order (e.g., [3, 1, 7]).
Respond with ONLY a JSON array of numbers, no explanation.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a search assistant. Return only a JSON array of numbers representing relevant snippet indices.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 100
    });

    const indices = JSON.parse(response.choices[0].message.content);
    return indices.map(i => snippets[i - 1]).filter(Boolean);
  } catch (error) {
    console.error('OpenAI Semantic Search Error:', error.message);
    // Fallback to regular snippets if AI fails
    return snippets;
  }
}

module.exports = {
  autoTagSnippet,
  semanticSearch
};
