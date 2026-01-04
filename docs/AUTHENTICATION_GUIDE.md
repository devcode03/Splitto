# Splitto Authentication System

## Overview

A complete authentication system for the Splitto app with email/password login, Google authentication, and password reset functionality. The system includes proper security rules to ensure users can only access their own data.

## Features

### 🔐 Authentication Methods

- **Email & Password**: Traditional email/password authentication
- **Google Sign-In**: One-click authentication with Google
- **Password Reset**: Email-based password recovery

### 🎨 Design

- Modern, semi-minimalistic UI matching the Splitto theme
- Purple gradient color scheme (#450bf7 to #bf99ff)
- Smooth animations and transitions
- Fully responsive design
- Password strength indicator on signup

### 🔒 Security Features

- Firebase Authentication integration
- Firestore security rules to protect user data
- User-specific data isolation (users only see their own groups)
- Protected routes requiring authentication
- Secure password reset via email

## Pages

### Login Page (`/login`)

- Email and password fields
- Google Sign-In button
- "Forgot Password?" link
- Link to signup page
- Real-time error messages

### Signup Page (`/signup`)

- First name and last name fields
- Email and password fields
- Password confirmation
- Password strength indicator
- Google Sign-Up button
- Link to login page

### Forgot Password Page (`/forgot-password`)

- Email input field
- Password reset email functionality
- Success/error messages
- Link back to login

## Implementation Details

### 1. Authentication Context (`src/Contexts/AuthContext.js`)

Manages global authentication state:

- `currentUser` - Currently logged-in user
- `login(email, password)` - Email/password login
- `signup(email, password, firstName, lastName)` - User registration
- `loginGoogle()` - Google authentication
- `logout()` - Sign out
- `forgotPassword(email)` - Password reset
- `updateProfile(updates)` - Update user profile

### 2. Auth Service (`src/services/firebase/authService.js`)

Firebase authentication functions:

- Email/password authentication
- Google popup authentication
- User profile management
- Firestore user document creation
- Comprehensive error handling

### 3. Private Route Component (`src/Components/PrivateRoute.js`)

Protects authenticated routes - redirects to login if not authenticated.

### 4. Updated Header (`src/Components/Header.js`)

- Displays logged-in user name/email
- Logout button with dropdown
- Conditional rendering based on auth state

## Data Structure

### User Document (Firestore)

```javascript
{
  uid: string,              // Firebase Auth UID
  email: string,            // User email
  firstName: string,        // First name
  lastName: string,         // Last name
  displayName: string,      // Full name
  photoURL: string | null,  // Profile photo (Google users)
  createdAt: Timestamp,     // Account creation date
  updatedAt: Timestamp      // Last update date
}
```

### Group Document (with Authentication)

```javascript
{
  groupID: string,
  userId: string,           // Owner's UID
  createdBy: string,        // Creator's UID
  name: string,
  members: [...],
  payments: [...],
  settlements: [...],
  createdAt: Timestamp,
  updatedAt: Timestamp,
  isActive: boolean
}
```

## Security Rules

### Firestore Rules (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Groups collection
    match /groups/{groupId} {
      // Allow read if authenticated AND user owns the group
      allow read: if request.auth != null
                  && resource.data.userId == request.auth.uid;

      // Allow create if authenticated AND setting own userId
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;

      // Allow update/delete if authenticated AND owns the group
      allow update, delete: if request.auth != null
                            && resource.data.userId == request.auth.uid;
    }
  }
}
```

### Key Security Features:

1. **Authentication Required**: All operations require valid Firebase Auth token
2. **User Data Isolation**: No cross-user access to groups
3. **Owner Verification**: Users can only access their own groups
4. **Automatic User Assignment**: userId added automatically on group creation

## Routes

### Public Routes

- `/login` - Login page
- `/signup` - Signup page
- `/forgot-password` - Password reset
- `/faq` - FAQ page
- `/contact` - Contact page
- `/privacy` - Privacy policy
- `/terms` - Terms and conditions
- `/about` - About page

### Protected Routes (Require Authentication)

- `/` - Home page with user's groups
- `/newGroup` - Create new group
- `/groupPage/:id` - View group details
- `/newGroup/:id/edit` - Edit group
- `/addPayment/:id` - Add payment
- `/addPayment/:id/edit` - Edit payment

## Usage Examples

### Using Authentication in Components

```javascript
import { useAuth } from "../Contexts/AuthContext";

function MyComponent() {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <p>Welcome, {currentUser.displayName}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Creating User-Specific Groups

```javascript
import { createGroup } from "../services/firebase/groupService";
import { useAuth } from "../Contexts/AuthContext";

function CreateGroupComponent() {
  const { currentUser } = useAuth();

  const handleCreateGroup = async () => {
    const newGroup = {
      groupID: generateId(),
      name: "Trip to Paris",
      members: [...],
      // userId is automatically added by createGroup()
    };

    const result = await createGroup(newGroup);
    if (result.success) {
      console.log("Group created!");
    }
  };

  return <button onClick={handleCreateGroup}>Create Group</button>;
}
```

### Protected Component Pattern

```javascript
import { useAuth } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedComponent() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <div>Protected Content</div>;
}
```

## Styling

All authentication pages use the `src/styles/Auth.css` stylesheet:

- Form styling matching the app theme
- Button styles (primary and Google)
- Error/success message styling
- Loading spinner animations
- Password strength indicator
- Responsive design breakpoints

### Color Scheme

- **Primary**: `#450bf7` to `#bf99ff` (Purple gradient)
- **Surface**: `#121212` to `#8b8b8b` (Dark theme)
- **Surface Tonal**: `#1b1526` to `#918d97` (Purple-tinted dark)
- **Text Light**: `#ffffff`
- **Text Dark**: `#000000`

## Testing Authentication

### Test User Flow

1. **Signup**: Navigate to `/signup`, create account
2. **Verify Redirect**: Should redirect to home page
3. **Check Header**: Name should appear in header
4. **Create Group**: Group should have userId attached
5. **Logout**: Click logout in header
6. **Login Different User**: Verify can't see first user's groups
7. **Forgot Password**: Test password reset flow
8. **Google Sign-In**: Test Google authentication

### Verify Security

1. Try accessing `/` without login → Should redirect to `/login`
2. Check Firestore groups → Should have `userId` field
3. Login with different users → Each sees only their own groups
4. Test security rules in Firebase Console Rules Playground

## Error Handling

Comprehensive error messages for:

- Invalid email format
- Weak passwords
- Email already in use
- Wrong password
- User not found
- Network errors
- Popup blocked (Google sign-in)
- Too many requests (rate limiting)

All errors display user-friendly messages with the `ErrorPopup` component.

## Setup Instructions

### Enable Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **mysplittoapp**
3. Navigate to **Authentication** → **Sign-in method**

**Email/Password:**

- Click on Email/Password
- Enable both toggles
- Click Save

**Google Sign-In:**

- Click on Google
- Enable toggle
- Select support email from dropdown
- Click Save

### Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

Or use the setup script:

**Windows:**

```bash
setup-firebase.bat
```

**Mac/Linux:**

```bash
chmod +x setup-firebase.sh
./setup-firebase.sh
```

## Troubleshooting

### "User not authenticated" errors

- Verify user is logged in
- Check Firebase Auth in Console
- Verify auth state in React DevTools

### "Permission denied" errors

- Deploy Firestore rules
- Verify userId is being added to groups
- Check security rules in Firebase Console

### Google Sign-In popup blocked

- Enable popups in browser
- Try in incognito mode
- Check browser console for errors

### Groups not appearing after login

- Verify groups have `userId` field
- Check Firestore in Firebase Console
- Verify security rules are deployed
- Check browser console for errors

## Best Practices

1. **Always check authentication state** before accessing protected resources
2. **Handle loading states** while Firebase initializes
3. **Use error boundaries** to catch authentication errors
4. **Validate user input** on both client and server
5. **Use security rules** for all database access
6. **Test with multiple accounts** to verify isolation
7. **Monitor Firebase Console** for suspicious activity

## Future Enhancements

Possible features to add:

- Email verification requirement
- User profile editing page
- Social sign-in (Facebook, Twitter, Apple)
- Two-factor authentication (2FA)
- Account deletion functionality
- Group sharing between users
- Activity log for user actions
- Session management controls
- Password strength requirements
- Account recovery options

---

For more information:

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete setup instructions
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [../README.md](../README.md) - Project overview
