@echo off
echo ========================================
echo Firebase Backend Setup for Splitto
echo ========================================
echo.

echo Step 1: Installing Firebase CLI globally...
call npm install -g firebase-tools
if %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to install Firebase CLI
    pause
    exit /b 1
)
echo Firebase CLI installed successfully!
echo.

echo Step 2: Logging into Firebase...
call firebase login
if %ERRORLEVEL% NEQ 0 (
    echo Error: Firebase login failed
    pause
    exit /b 1
)
echo.

echo Step 3: Setting Firebase project...
call firebase use mysplittoapp
if %ERRORLEVEL% NEQ 0 (
    echo Warning: Could not set project. You may need to run 'firebase init' first
)
echo.

echo Step 4: Creating Firestore Database...
echo Please go to Firebase Console and:
echo   1. Navigate to Firestore Database
echo   2. Click "Create Database"
echo   3. Choose "Start in test mode"
echo   4. Select your preferred location
echo.
echo Press any key after you've created the database...
pause >nul
echo.

echo Step 5: Deploying Firestore rules and indexes...
call firebase deploy --only firestore
if %ERRORLEVEL% NEQ 0 (
    echo Warning: Deployment may have failed. Check the error above.
) else (
    echo Rules and indexes deployed successfully!
)
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Your Firebase backend is now configured.
echo You can start your React app with: npm start
echo.
echo For more information, see FIREBASE_SETUP.md
echo.
pause
