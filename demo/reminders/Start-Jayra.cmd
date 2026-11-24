@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
    echo Node.js is required. Install it from https://nodejs.org/ and try again.
    pause
    exit /b 1
)
echo Open http://127.0.0.1:4173 in your browser. Keep this window open.
node server.mjs
pause
