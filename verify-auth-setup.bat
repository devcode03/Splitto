@echo off
echo ============================================
echo Splitto Authentication Setup Verification
echo ============================================
echo.

echo Checking Firebase configuration...
if exist "src\config\firebase.js" (
    echo ✓ Firebase config file found
) else (
    echo ✗ Firebase config file missing!
    echo Please create src\config\firebase.js
    goto :error
)

echo.
echo Checking authentication files...

set "files=src\Contexts\AuthContext.js src\services\firebase\authService.js src\Pages\Login.js src\Pages\Signup.js src\Pages\ForgotPassword.js src\Components\PrivateRoute.js src\styles\Auth.css"

for %%f in (%files%) do (
    if exist "%%f" (
        echo ✓ %%f
    ) else (
        echo ✗ %%f missing!
        goto :error
    )
)

echo.
echo Checking security rules...
if exist "firestore.rules" (
    echo ✓ Firestore rules file found
) else (
    echo ✗ Firestore rules file missing!
    goto :error
)

echo.
echo ============================================
echo All authentication files are in place!
echo ============================================
echo.
echo Next steps:
echo 1. Run: npm install
echo 2. Enable Email/Password auth in Firebase Console
echo 3. Enable Google auth in Firebase Console
echo 4. Deploy security rules: firebase deploy --only firestore:rules
echo 5. Start the app: npm start
echo.
goto :end

:error
echo.
echo ============================================
echo Setup incomplete! Please fix the errors above.
echo ============================================
echo.

:end
pause
