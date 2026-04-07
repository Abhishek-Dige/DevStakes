/**
 * STORY CONTROLLER - REQUEST HANDLERS
 * 
 * Endpoints to implement:
 * 
 * POST /api/story/start
 * - Body: { genre: string }
 * - Creates new story in DB
 * - Generates opening scene with AI
 * - Generates initial choices
 * - Returns: { sessionId, scene, choices, turn: 1 }
 * 
 * POST /api/story/continue
 * - Body: { sessionId: string, choice: string }
 * - Fetches story history
 * - Generates next scene based on choice
 * - Saves new turn to DB
 * - Returns: { scene, choices, imageUrl, turn }
 * 
 * POST /api/story/finalize
 * - Body: { sessionId: string }
 * - Generates story summary and character identity
 * - Updates story status to completed
 * - Returns: { summary, characterIdentity, totalTurns }
 * 
 * GET /api/story/:sessionId
 * - Returns full story history with all turns
 * 
 * Imports needed:
 * // const aiService = require('../services/aiService');
 * // const supabaseService = require('../services/supabaseService');
 */