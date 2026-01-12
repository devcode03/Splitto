#!/bin/bash

echo "========================================"
echo "Firebase Backend Setup for Splitto"
echo "========================================"
echo ""

echo "Step 1: Installing Firebase CLI globally..."
npm install -g firebase-tools
if [ $? -ne 0 ]; then
    echo "Error: Failed to install Firebase CLI"
    exit 1
fi
echo "Firebase CLI installed successfully!"
echo ""

echo "Step 2: Logging into Firebase..."
firebase login
if [ $? -ne 0 ]; then
    echo "Error: Firebase login failed"
    exit 1
fi
echo ""

echo "Step 3: Setting Firebase project..."
firebase use mysplittoapp
if [ $? -ne 0 ]; then
    echo "Warning: Could not set project. You may need to run 'firebase init' first"
fi
echo ""

echo "Step 4: Creating Firestore Database..."
echo "Please go to Firebase Console and:"
echo "  1. Navigate to Firestore Database"
echo "  2. Click 'Create Database'"
echo "  3. Choose 'Start in test mode'"
echo "  4. Select your preferred location"
echo ""
read -p "Press Enter after you've created the database..."
echo ""

echo "Step 5: Deploying Firestore rules and indexes..."
firebase deploy --only firestore
if [ $? -ne 0 ]; then
    echo "Warning: Deployment may have failed. Check the error above."
else
    echo "Rules and indexes deployed successfully!"
fi
echo ""

echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Your Firebase backend is now configured."
echo "You can start your React app with: npm start"
echo ""
echo "For more information, see FIREBASE_SETUP.md"
echo ""
