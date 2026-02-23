@echo off
title Fullstack Dev Launcher

echo ===============================
echo Installing Backend Dependencies
echo ===============================
cd backend
call npm install

echo ===============================
echo Installing Frontend Dependencies
echo ===============================
cd ../frontend
call npm install

echo ===============================
echo Starting Backend Server
echo ===============================
start cmd /k "cd backend && npm run dev"

timeout /t 3 > nul

echo ===============================
echo Starting Frontend Server
echo ===============================
start cmd /k "cd frontend && npm start"

echo ===============================
echo All services are running!
echo ===============================

pause