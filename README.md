# JAYRA One Space

Single-page Bengali and English voice companion. Existing layout is preserved.

## Run

Node.js 18+: `npm ci`, then `npm run dev` for the static UI. `npm run build` produces dist/. Local static preview cannot serve /api; use Vercel for AI endpoints.

## Server configuration

Set production environment variables in Vercel: GROQ_API_KEY, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, ZYRA_SESSION_SECRET (random 48+ characters), ZYRA_APP_ID=jayra-one-space. Never put these in browser code or Git. Until configured, chat reports unavailable rather than returning scripted answers.

## Voice

Start talking requests browser microphone recognition. Choose English or বাংলা in settings before speaking; switch languages there during a session. Speech recognition depends on browser support (Chrome recommended) and may use its online provider. Replies use server-side Microsoft Edge Read Aloud voices through msedge-tts; this unofficial interface may become unavailable. English or an installed Bengali voice can fall back to browser speech. No guaranteed free-service availability.

Conversation requests go to Groq. Reply text goes to Microsoft for speech. Camera stays a local preview. Chat history stays in page memory until clear/reload and is sent as context for each reply. No persistent AI memory or computer control is connected. Existing browser reminders alert only while the page is open.

## Checks

`npm test` tests server validation, language forwarding, credential-safe errors and signed session integrity. `npm run check` checks browser JavaScript syntax. Real live AI and microphone tests also require configured production credentials and microphone permission.
