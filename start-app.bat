@echo off
echo Starting MyApp...
echo.
echo Frontend will be available at: http://192.168.0.188:3000
echo Backend will be available at: http://192.168.0.188:5000
echo.
echo Share this link with others: http://192.168.0.188:3000
echo.
start cmd /k "cd /d c:\Users\hp\Desktop\myapp\backend && npm start"
timeout /t 3
start cmd /k "cd /d c:\Users\hp\Desktop\myapp\web-frontend && npm start"
echo.
echo Both servers are starting...
pause