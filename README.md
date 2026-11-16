# JAYRA — One Space

A single-page frontend copied from the original JAYRA One Space concept. The original markup, visual styles, portraits, particle animation and interactions are preserved. No additional pages have been introduced.

## Run locally

Install Node.js 18 or later. No package installation is needed.

```sh
npm run dev
```

Open http://127.0.0.1:4175. Use `npm run check` to validate JavaScript and `npm run build` to prepare the deployable `dist/` folder. Any static host can serve `dist/`.

## Files

- `src/index.html`: the one page, with the original layout and controls.
- `src/styles.css`: original responsive styling and animation rules.
- `src/app.js`: original demo interactions.
- `dist/*.png`: original portrait assets, retained without modification.
- `scripts/`: dependency-free build and local preview tools.

## Current behavior and limits

Conversation is scripted sample behavior, not a connected AI model. Reminders are saved only in this browser and alert while this page is open. Camera access is opt-in and provides a local preview only. Browser speech availability and language quality depend on the browser and installed voices. App buttons are previews and do not launch installed desktop programs. There is no account system, cloud memory, cross-device synchronization or background assistant.

Microphone and camera are requested only by their explicit controls. No API keys belong in browser code. Google Fonts is the only external visual dependency.

## Backend work comes next

Keep this single-page UI. Add a server-side chat endpoint and connect it at the `send`/`reply` interaction boundary in `src/app.js`. The server must own provider credentials, authenticate sessions and enforce usage limits. Real persistent memory, scheduled notifications and desktop app control each need their own implementation; the existing demo must not imply those services are connected.
