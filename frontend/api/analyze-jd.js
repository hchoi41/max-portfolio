// Vercel Serverless Function: JD Analysis API
// POST /api/analyze-jd

import Anthropic from '@anthropic-ai/sdk';
import { MAX_CONTEXT } from '../data/max-context.js';

// Initialize Anthropic client (API key from environment variable)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Rate limiting (simple in-memory, resets on cold start)
const rateLimit = {
  requests: new Map(),
  maxRequests: 10, // per IP per hour
  windowMs: 60 * 60 * 1000, // 1 hour
};

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimit.requests.get(ip);

  if (!record || now - record.timestamp > rateLimit.windowMs) {
    rateLimit.requests.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= rateLimit.maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// System prompt for JD analysis
const SYSTEM_PROMPT = `You are an expert career advisor analyzing job descriptions for Max Choi (최홍익).

## Max's Profile
${MAX_CONTEXT.profile}

## Max's Key Achievements
${MAX_CONTEXT.achievements.map(a => `- ${a}`).join('\n')}

## Max's Core Skills
${MAX_CONTEXT.skills.map(s => `- ${s}`).join('\n')}

## Max's Target Roles
${MAX_CONTEXT.targetRoles.join(', ')}

## Your Task
Analyze the provided Job Description and evaluate Max's fit for this role. Provide:
1. Overall fit score (0-100%)
2. Matched qualifications (what Max has)
3. Gaps to address (what Max needs to develop)
4. Specific recommendations for application
5. Key talking points for interview

Be honest and objective. If the role is not a good fit, say so clearly.
Respond in the same language as the Job Description (Korean or English).`;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check API key configuration
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({
      error: 'LLM API not configured',
      message: 'Please set ANTHROPIC_API_KEY environment variable in Vercel dashboard'
    });
  }

  // Rate limiting
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Too many requests',
      message: 'Please try again later (max 10 requests per hour)'
    });
  }

  try {
    const { jdText, source } = req.body;

    // Validate input
    if (!jdText || typeof jdText !== 'string') {
      return res.status(400).json({ error: 'jdText is required' });
    }

    if (jdText.length < 50) {
      return res.status(400).json({ error: 'JD text too short (min 50 characters)' });
    }

    if (jdText.length > 20000) {
      return res.status(400).json({ error: 'JD text too long (max 20,000 characters)' });
    }

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Please analyze this Job Description and evaluate my fit:\n\n---\n${jdText}\n---\n\nProvide a structured analysis with fit score, matched skills, gaps, and recommendations.`
        }
      ]
    });

    // Extract response
    const analysisText = message.content[0].text;

    // Parse the response into structured format
    const analysis = parseAnalysisResponse(analysisText, jdText);

    return res.status(200).json({
      success: true,
      analysis,
      source: source || 'direct',
      timestamp: new Date().toISOString(),
      _meta: {
        model: 'claude-sonnet-4-20250514',
        tokensUsed: message.usage?.output_tokens || 0
      }
    });

  } catch (error) {
    console.error('JD Analysis Error:', error);

    // Handle specific API errors
    if (error.status === 401) {
      return res.status(503).json({
        error: 'API authentication failed',
        message: 'Invalid API key configuration'
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: 'API rate limit exceeded',
        message: 'Please try again in a few minutes'
      });
    }

    return res.status(500).json({
      error: 'Analysis failed',
      message: error.message || 'Unknown error'
    });
  }
}

// Parse Claude's response into structured format
function parseAnalysisResponse(text, jdText) {
  // Extract fit score (look for patterns like "85%", "Score: 75", etc.)
  const scoreMatch = text.match(/(\d{1,3})%|score[:\s]+(\d{1,3})/i);
  const overallScore = scoreMatch ? parseInt(scoreMatch[1] || scoreMatch[2]) : 70;

  // Determine verdict based on score
  let verdict;
  if (overallScore >= 80) {
    verdict = jdText.includes('한') ? '높은 적합도 - 적극 지원 권장' : 'High Fit - Strongly Recommended';
  } else if (overallScore >= 60) {
    verdict = jdText.includes('한') ? '적합도 양호 - 지원 고려' : 'Good Fit - Consider Applying';
  } else {
    verdict = jdText.includes('한') ? 'Gap 보완 후 지원 권장' : 'Consider After Addressing Gaps';
  }

  // Word count stats
  const words = jdText.split(/\s+/).length;
  const estimatedReadTime = Math.ceil(words / 200) + ' min';

  return {
    fitAnalysis: {
      overallScore: Math.min(100, Math.max(0, overallScore)),
      verdict,
      matchedCategories: [], // Could be parsed from response
      gaps: [] // Could be parsed from response
    },
    fullAnalysis: text,
    recommendations: extractRecommendations(text),
    stats: {
      words,
      estimatedReadTime
    }
  };
}

// Extract recommendations from analysis text
function extractRecommendations(text) {
  const recommendations = [];

  // Look for bullet points or numbered items in recommendations section
  const recSection = text.match(/recommendation[s]?[:\s]*([\s\S]*?)(?=\n\n|\n#|$)/i);
  if (recSection) {
    const items = recSection[1].match(/[-•*]\s*(.+)|(\d+)\.\s*(.+)/g);
    if (items) {
      items.slice(0, 5).forEach(item => {
        recommendations.push(item.replace(/^[-•*\d.]\s*/, '').trim());
      });
    }
  }

  // Fallback: return generic recommendations
  if (recommendations.length === 0) {
    recommendations.push('Review the full analysis above for detailed insights');
  }

  return recommendations;
}
