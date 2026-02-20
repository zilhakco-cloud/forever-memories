// ============================================================
// Claude API Service
// ============================================================
// Handles all communication with the Anthropic Claude API.
// Uses the browser-compatible fetch approach since this is
// a client-side only app.
//
// ENV VAR REQUIRED: VITE_ANTHROPIC_API_KEY
// Set this in Netlify > Site Settings > Environment Variables
// ============================================================

import { AMMI_SYSTEM_PROMPT, CLAUDE_MODEL } from '../config/ammi-persona';

// Build messages array for Claude API
export async function sendMessageToAmmi(conversationHistory, userMessage) {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

    if (!apiKey) {
        console.warn('[Forever] No API key found. Set VITE_ANTHROPIC_API_KEY in your .env file.');
        return getFallbackResponse();
    }

    const messages = [
        ...conversationHistory,
        { role: 'user', content: userMessage },
    ];

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                // Direct browser calls to Anthropic require this header
                'anthropic-dangerous-direct-browser-access': 'true',
            },
            body: JSON.stringify({
                model: CLAUDE_MODEL,
                max_tokens: 400,
                system: AMMI_SYSTEM_PROMPT,
                messages,
            }),
        });

        if (!response.ok) {
            const err = await response.json();
            console.error('[Forever] API Error:', err);
            return getFallbackResponse();
        }

        const data = await response.json();
        return data.content[0].text;
    } catch (error) {
        console.error('[Forever] Network error:', error);
        return getFallbackResponse();
    }
}

// Graceful fallback when API is not configured
function getFallbackResponse() {
    const fallbacks = [
        "Beta, mera internet thoda slow lag raha hai aaj. Phir bhi tumse baat karna chahti hoon — kya haal hai?",
        "Aao, chai banao. Sab theek ho jaata hai chai ke saath. Kuch baat karo mujhse.",
        "Ek minute beta — Ammi aa rahi hai. Allah ka shukar hai tumne yaad kiya.",
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// ============================================================
// ElevenLabs Voice Placeholder
// ============================================================
// REAL_VOICE: When ElevenLabs voice_id is ready, implement here.
// 1. Get voice_id from ElevenLabs dashboard after cloning Ammi's voice
// 2. Replace the console.log below with actual ElevenLabs API call
// 3. Set VITE_ELEVENLABS_API_KEY and VITE_ELEVENLABS_VOICE_ID in Netlify
// ============================================================
export async function playAmmiVoice(text) {
    // REAL_VOICE: plug ElevenLabs voice_id here
    const voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID;
    const elevenKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

    console.log('[Forever] 🔊 Voice playback requested:', text.substring(0, 60) + '...');
    console.log('[Forever] Voice ID:', voiceId || 'NOT SET — add VITE_ELEVENLABS_VOICE_ID to .env');

    // TODO: Uncomment when ElevenLabs is connected:
    // const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    //   method: 'POST',
    //   headers: { 'xi-api-key': elevenKey, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2' }),
    // });
    // const audioBlob = await response.blob();
    // const audioUrl = URL.createObjectURL(audioBlob);
    // new Audio(audioUrl).play();
}
