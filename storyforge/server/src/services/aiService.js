/**
 * AI SERVICE - GROQ API INTEGRATION
 * 
 * Functions to implement:
 * - generateOpening(genre) - Create initial story scene
 * - continueStory(context, userChoice) - Generate next scene based on choice
 * - generateChoices(scene) - Create 3 compelling choices from current scene
 * - generateSummary(fullStory) - Create final story summary
 * - generateCharacterIdentity(turns) - Analyze choices to create character archetype
 * - generateImagePrompt(sceneText, genre) - Convert story scene to image generation prompt
 * 
 * Uses Groq SDK with llama-3.1-70b-versatile model
 * Implements streaming for real-time responses
 * 
 * Imports needed:
 * // const Groq = require('groq-sdk');
 */