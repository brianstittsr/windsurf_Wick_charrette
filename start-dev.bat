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

echo 🔧 Starting backend server...
start "Charette Backend" cmd /k "npm run dev"

timeout /t 3 /nobreak > nul

echo 🌐 Starting frontend development server...
start "Charette Frontend" cmd /k "cd client && npm start"

echo.
echo 🎉 Charette System is starting up!
echo Backend: http://localhost:5000 (API)
echo Frontend: http://localhost:3000 (React App)
echo.
echo Close the command windows to stop the servers.
pause
