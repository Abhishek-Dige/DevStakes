/**
 * Express routes for /api/story endpoints
 */
const express = require('express');
const router = express.Router();

// Mock controllers for now until implemented
router.post('/start', (req, res) => res.json({ message: 'Started story' }));
router.post('/continue', (req, res) => res.json({ message: 'Continued story' }));
router.post('/finalize', (req, res) => res.json({ message: 'Finalized story' }));
router.get('/:sessionId', (req, res) => res.json({ message: 'Got story' }));

module.exports = router;