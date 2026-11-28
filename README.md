# JAYRA One Space

A browser-based AI companion for Bengali and English. Chat by typing or speaking, listen to replies, and manage reminders in the browser.

[Open the live app](https://jayra-one-space.vercel.app/)

Built by **Shanaj Akter**. For voice input, open the app in Chrome, choose your language in Settings, and allow microphone access.

## What can JAYRA do now?

| Feature | What it does |
| --- | --- |
| AI chat | Answers your questions with Groq AI. |
| Bengali and English | Understands text in both languages. It can also understand Banglish, such as `amar nam Shanaj`. Answers may sometimes be wrong. |
| Voice input | Turns your speech into text and sends it to the AI. Choose the correct language in Settings before you speak. |
| Spoken answers | Reads answers with an online female voice in Bengali or English. |
| Listen again | The **Listen** button plays an answer again. |
| Voice controls | **End conversation** stops listening. **Mute** turns off spoken replies. |
| Short conversation context | Uses recent messages from the current page to follow the conversation. |
| Browser reminders | You can add a reminder with the **+** button, mark it done, or delete it. Reminders are saved in the same browser. Alerts work only while the page is open. |
| Camera preview | Shows your camera view when you turn it on. JAYRA does not understand or analyze the video. |
| Avatar choices | You can choose Core or Female visuals. This does not change the online female reply voice. |

**Messages here mean website chat messages. JAYRA does not send SMS messages to phone numbers.**

## How to talk with JAYRA

1. Open the live website. Chrome is recommended.
2. Open **Settings** and choose **English** or **বাংলা**.
3. Keep **Speak replies** on if you want to hear answers.
4. Press **Start talking** and allow microphone access.
5. Speak in the language you selected. JAYRA will answer and speak.
6. Press **End conversation** when you finish. You can also type in the message box.

Language selection is manual. If you select English but speak Bengali, the browser may hear the wrong words. Check the text under **YOU** if an answer seems wrong.

## Current daily limits

These are the app's default limits. A browser session is identified by a secure browser cookie; there are no user accounts yet. These are not verified limits for each person.

| Use | One browser session | All visitors together |
| --- | --- | --- |
| AI chat requests | 100 per day | 200 per day |
| Online voice requests | 100 per day | 1,000 per day |

- One typed or spoken question sent to the AI uses one chat request.
- Reading the answer aloud uses a separate voice request.
- Pressing **Listen** again uses another voice request.
- These are request limits, not word limits. Some failed requests can also use the app's allowance.
- The daily app limits reset at **12:00 midnight in Bangladesh (UTC+6)**.
- All visitors share the total limit. For example, two sessions using 100 AI requests each can use all 200 requests for that day. Ten people cannot each use 100 AI requests with the current total limit.
- People on the same internet connection also share a network limit: 300 requests per day for chat and 300 for voice. Chat allows 10 requests per minute per connection; voice allows 30.
- Groq, Vercel, Upstash, or the voice service may reach their own limits first. The app's allowance does not promise that all requests will be available.
- The owner can change the chat limits with server settings. The table shows the defaults in this repository.

## What is not available yet?

- Sending SMS, making phone calls, or sending messages in Messenger.
- Opening or controlling apps on your computer. Chrome, VS Code, and Files buttons are previews only.
- Long-term AI memory, login accounts, or automatic chat history sync between devices.
- Automatic voice language detection.
- Understanding camera images or recognizing people.
- A reminder service that runs after the page is closed, or guaranteed phone notifications.
- An always-on desktop assistant.

Refreshing or closing the page clears the current chat context. **Clear conversation** also clears it. Saved browser reminders are separate from chat context.

## Internet and privacy

Internet access is needed for online AI and voices. Conversation text and recent chat context go to Groq. Reply text goes to Microsoft for voice generation. Your browser's speech service may process your voice online. Camera preview stays on your device. The microphone and camera stay off until you choose to use them.

AI answers can contain mistakes. Online voices depend on an unofficial Microsoft Edge Read Aloud interface through `msedge-tts`; availability is not guaranteed. Browser voice fallback depends on installed voices and browser support.

## For developers

### Run the project

Use Node.js 18 or later:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4175. This command shows the static page only. It does not run the AI backend. Use a configured Vercel deployment for the `/api` endpoints.

```sh
npm run build
npm run check
npm test
```

The build output is in `dist/`. Tests check language forwarding, request validation, safe errors, and signed sessions. They do not test a real microphone or guarantee live provider availability.

### Server settings

Set these in Vercel Environment Variables, then redeploy:

- `GROQ_API_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `ZYRA_SESSION_SECRET`: a random secret of at least 43 characters; use 48 or more.
- `ZYRA_APP_ID`: `jayra-one-space`

Optional chat limits: `ZYRA_DAILY_LIMIT` (default 100, maximum 100) and `ZYRA_GLOBAL_DAILY_LIMIT` (default 200, maximum 10,000).

Never put API keys or tokens in browser code, this README, or GitHub. Without the required settings, the AI reports that it is unavailable instead of giving scripted replies.
