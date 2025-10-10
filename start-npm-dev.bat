@echo off
echo 🚀 Starting Charette System Development Environment
echo ===================================================
echo.

echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

cd client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo ✅ Dependencies installed successfully
echo.

echo 🔧 Starting development servers using npm run dev...
echo This will start both backend and frontend concurrently
echo.
echo Backend: http://localhost:5000 (API)
echo Frontend: http://localhost:3000 (React App)
echo.
echo Press Ctrl+C to stop the servers.
echo.

npm run dev

pause
