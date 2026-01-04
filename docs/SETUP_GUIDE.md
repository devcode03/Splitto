# Splitto Setup Guide

## Quick Setup (5 Minutes)

### Prerequisites

- Node.js 14+ installed
- Firebase account
- Firebase CLI (optional): `npm install -g firebase-tools`

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Firebase Console Setup

#### A. Create/Verify Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **mysplittoapp**
3. Click **Firestore Database** in left menu
4. If not created, click **Create Database**
   - Choose **"Start in test mode"** (for development)
   - Select your preferred location
   - Click **Enable**

#### B. Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password**:
   - Click on Email/Password
   - Toggle both options ON
   - Click Save
3. Enable **Google Sign-In**:
   - Click on Google
   - Toggle ON
   - Select a support email from dropdown
   - Click Save

### Step 3: Deploy Firestore Rules (Recommended)

```bash
firebase login
firebase use mysplittoapp
firebase deploy --only firestore:rules
```

Or on Windows, use the setup script:

```bash
setup-firebase.bat
```

Or on Mac/Linux:

```bash
chmod +x setup-firebase.sh
./setup-firebase.sh
```

### Step 4: Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

---

## Testing Your Setup

### Test Authentication

1. Navigate to `http://localhost:3000/#/signup`
2. Create a new account with email/password or Google
3. Verify you're redirected to the home page
4. Check the header shows your name

### Test Group Creation

1. Click **Create New Group**
2. Add group name, members, and select currency
3. Save the group
4. Verify it appears in your list

### Test Data Isolation

1. Logout from the header
2. Sign up with a different account
3. Verify you don't see the previous user's groups

### Test Real-time Sync

1. Open the app in two different browsers
2. Login with the same account in both
3. Create/edit a group in one browser
4. Verify changes appear instantly in the other browser

---

## Firebase Configuration

Your Firebase configuration is already set up in `src/config/firebase.js`:

- **Project ID**: mysplittoapp
- **Authentication**: Email/Password + Google
- **Database**: Firestore
- **Analytics**: Enabled

---

## Troubleshooting

### "Firebase not initialized" error

- Make sure you've run `npm install`
- Check that `src/config/firebase.js` exists

### "Permission denied" errors

- Deploy Firestore rules: `firebase deploy --only firestore:rules`
- Ensure you're logged in (Authentication enabled)

### Groups not appearing

- Check Firebase Console → Firestore Database
- Verify your user is authenticated
- Check browser console for errors

### Real-time updates not working

- Verify Firestore database is created
- Check network tab for WebSocket connection
- Ensure you're using the same account across devices

---

## Security Rules Overview

The project uses Firestore security rules to protect user data:

- Users can only read/write their own groups
- Groups are filtered by `userId`
- All writes require authentication

Rules are defined in `firestore.rules` at the project root.

---

## Development Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `firebase deploy` - Deploy to Firebase Hosting

---

## Project Structure

```
Splitto/
├── src/
│   ├── config/
│   │   └── firebase.js              # Firebase configuration
│   ├── services/
│   │   └── firebase/
│   │       ├── authService.js       # Authentication functions
│   │       ├── groupService.js      # Group CRUD operations
│   │       ├── paymentService.js    # Payment operations
│   │       └── settlementService.js # Settlement operations
│   ├── hooks/
│   │   ├── useFirebaseGroups.js     # Groups hook with real-time
│   │   └── useFirebasePayments.js   # Payments hook
│   ├── Contexts/
│   │   ├── AuthContext.js           # Authentication state
│   │   ├── GroupContext.js          # Groups state (Firebase)
│   │   └── CurrencyContext.js       # Currency state
│   ├── Pages/
│   │   ├── Login.js                 # Login page
│   │   ├── Signup.js                # Signup page
│   │   ├── ForgotPassword.js        # Password reset
│   │   ├── HomePage.js              # Landing page
│   │   ├── NewGroup-v2.js           # Create group
│   │   ├── Group.js                 # Group details
│   │   ├── EditGroup.js             # Edit group
│   │   └── Payment.js               # Add/edit payment
│   └── Components/
│       ├── Header.js                # Header with auth
│       ├── PrivateRoute.js          # Protected routes
│       └── ...
├── docs/                            # Documentation
├── firestore.rules                  # Security rules
├── firebase.json                    # Firebase config
└── package.json                     # Dependencies
```

---

## Next Steps

- Read [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md) for detailed auth documentation
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system architecture
- Check [COMPONENT_TREE.md](./COMPONENT_TREE.md) for component structure
- See main [README.md](../README.md) for project overview
