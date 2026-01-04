@echo off
echo ============================================
echo Deploying Splitto Authentication System
echo ============================================
echo.

echo Step 1: Deploying Firestore Security Rules...
call firebase deploy --only firestore:rules
if %errorlevel% neq 0 (
    echo ERROR: Failed to deploy Firestore rules
    pause
    exit /b %errorlevel%
)
echo ✓ Firestore rules deployed successfully
echo.

echo Step 2: Building React Application...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Failed to build application
    pause
    exit /b %errorlevel%
)
echo ✓ Application built successfully
echo.

echo Step 3: Deploying to Firebase Hosting...
call firebase deploy --only hosting
if %errorlevel% neq 0 (
    echo ERROR: Failed to deploy to hosting
    pause
    exit /b %errorlevel%
)
echo ✓ Application deployed successfully
echo.

echo ============================================
echo Deployment Complete!
echo ============================================
echo.
echo Please verify the following in Firebase Console:
echo 1. Authentication → Sign-in method
echo    - Enable Email/Password
echo    - Enable Google (configure OAuth)
echo 2. Firestore Database → Rules tab
echo    - Verify rules are published
echo.
pause
