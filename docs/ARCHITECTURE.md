# Splitto Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER ACTIONS                          │
│   (Login, Create Group, Add Payment, Edit, Delete, etc.)    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   REACT COMPONENTS                           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   Login    │  │  NewGroup  │  │  Payment   │           │
│  │   Signup   │  │  EditGroup │  │   Group    │           │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘           │
└────────┼────────────────┼────────────────┼──────────────────┘
         │                │                │
         │ uses           │ uses           │ uses
         ↓                ↓                ↓
┌─────────────────────────────────────────────────────────────┐
│                   REACT CONTEXTS                             │
│  ┌────────────────┐         ┌────────────────────┐         │
│  │  AuthContext   │         │   GroupContext     │         │
│  │                │         │                    │         │
│  │• currentUser   │         │• groups (real-time)│         │
│  │• login()       │         │• setGroups()       │         │
│  │• signup()      │         │• updateGroup()     │         │
│  │• logout()      │         │• loading, error    │         │
│  └────────┬───────┘         └──────────┬─────────┘         │
└───────────┼────────────────────────────┼───────────────────┘
            │                            │
            │ calls                      │ subscribes to
            ↓                            ↓
┌─────────────────────────────────────────────────────────────┐
│              CUSTOM HOOKS & SERVICES                         │
│  ┌──────────────────┐  ┌────────────────────────────────┐  │
│  │ authService.js   │  │  useFirebaseGroups             │  │
│  │                  │  │  useFirebasePayments           │  │
│  │• loginWithEmail()│  │                                 │  │
│  │• signupWithEmail()│ │  • addGroup()                  │  │
│  │• loginWithGoogle()│ │  • updateGroup()               │  │
│  │• resetPassword() │  │  • addPayment()                │  │
│  └────────┬─────────┘  └──────────┬─────────────────────┘  │
└───────────┼────────────────────────┼────────────────────────┘
            │                        │
            │ Firebase Auth API      │ Firestore API
            ↓                        ↓
┌─────────────────────────────────────────────────────────────┐
│                 FIREBASE SERVICES                            │
│  ┌──────────────────┐  ┌────────────────┐  ┌─────────────┐│
│  │ Authentication   │  │   Firestore    │  │  Analytics  ││
│  │                  │  │   Database     │  │             ││
│  │• Email/Password  │  │                │  │             ││
│  │• Google Sign-In  │  │• groups/       │  │             ││
│  │• Password Reset  │  │  collection    │  │             ││
│  └──────────────────┘  └────────────────┘  └─────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

```
User Opens App
      │
      ▼
┌──────────────┐
│ Authenticated?│
└──────┬───────┘
       │
   ┌───┴────┐
   │        │
  NO       YES
   │        │
   ▼        ▼
┌──────┐ ┌────────────┐
│/login│ │  Home Page │
└──┬───┘ │ (Protected)│
   │     └────────────┘
   ▼
┌─────────────────┐
│  Login Options  │
│• Email/Password │
│• Google Sign-In │
│• Signup Link    │
│• Forgot Password│
└────────┬────────┘
         │
         ▼ (After Login)
┌─────────────────┐
│  Redirect to    │
│  Home Page      │
└─────────────────┘
```

---

## Data Flow - Create Group

```
User fills form in NewGroup.js
      │
      ▼
Click "Create Group"
      │
      ▼
GroupContext.addGroup()
      │
      ▼
useFirebaseGroups hook
      │
      ▼
groupService.createGroup()
      │
      ├─ Add userId from auth.currentUser
      ├─ Add timestamps
      ├─ Add groupID
      │
      ▼
Firestore: setDoc(groups/{groupId})
      │
      ▼
Real-time listener detects change
      │
      ▼
GroupContext updates state
      │
      ▼
All components re-render with new data
      │
      ▼
User sees new group in list
```

---

## Data Flow - Real-time Sync

```
User A creates/edits group
      │
      ▼
Firestore updates document
      │
      ├────────────┬────────────┐
      ▼            ▼            ▼
User A's      User B's      User C's
  App           App           App
  (same        (same        (different
 browser)     account)      account)
      │            │            │
      ▼            ▼            ▼
onSnapshot    onSnapshot    (no update)
 triggers      triggers
      │            │
      ▼            ▼
GroupContext  GroupContext
  updates       updates
      │            │
      ▼            ▼
  UI updates   UI updates
  instantly    instantly
```

---

## Component Tree

```
App (with AuthProvider)
├── Router (HashRouter)
    ├── Header
    │   ├── Logo & Navigation
    │   └── [if authenticated]
    │       ├── User Info (name/email)
    │       └── Logout Button
    │
    ├── Routes
    │   ├── PUBLIC ROUTES
    │   │   ├── /login          → Login Page
    │   │   ├── /signup         → Signup Page
    │   │   ├── /forgot-password→ Password Reset
    │   │   ├── /faq            → FAQ
    │   │   ├── /contact        → Contact
    │   │   ├── /privacy        → Privacy Policy
    │   │   ├── /terms          → Terms & Conditions
    │   │   └── /about          → About Page
    │   │
    │   └── PROTECTED ROUTES (PrivateRoute wrapper)
    │       ├── /               → HomePage + GroupList
    │       ├── /newGroup       → NewGroup-v2
    │       ├── /groupPage/:id  → Group Details
    │       ├── /newGroup/:id/edit → EditGroup
    │       ├── /addPayment/:id → Payment (Add)
    │       └── /addPayment/:id/edit → Payment (Edit)
    │
    └── Footer
```

---

## Context Provider Hierarchy

```
index.js
└── React.StrictMode
    └── GroupProvider
        └── CurrencyProvider
            └── AuthProvider
                └── Router
                    └── Routes
                        └── Components
```

---

## Firestore Database Schema

### Groups Collection: `/groups/{groupId}`

```javascript
{
  groupID: "uuid-string",              // Unique group identifier
  userId: "firebase-user-uid",         // Owner's Firebase Auth UID
  createdBy: "firebase-user-uid",      // Creator's UID
  name: "Trip to Manali",              // Group name

  currency: {
    code: "INR",                       // Currency code
    symbol: "₹",                       // Currency symbol
    name: "Indian Rupee"               // Currency name
  },

  members: [
    {
      id: "uuid",                      // Member identifier
      name: "John Doe"                 // Member name
    }
  ],

  payments: [
    {
      id: "uuid",                      // Payment identifier
      payer: "John Doe",               // Who paid
      paymentOf: "Dinner",             // What for
      price: 1500,                     // Amount
      splitAmong: ["John", "Jane"],    // Split between
      date: "2026-01-04",              // Payment date
      createdAt: Timestamp             // Creation timestamp
    }
  ],

  settlements: [
    {
      id: "uuid",                      // Settlement identifier
      from: "Jane Doe",                // Who pays
      to: "John Doe",                  // Who receives
      amount: 750,                     // Amount
      settledAt: Timestamp             // Settlement timestamp
    }
  ],

  createDt: "2026-01-04T12:00:00",    // ISO date string
  createdAt: Timestamp,                // Firestore timestamp
  updatedAt: Timestamp,                // Last update timestamp
  isActive: true                       // Soft delete flag
}
```

---

## Service Layer Functions

### groupService.js

- `createGroup(groupData)` - Create new group with userId
- `getGroup(groupId)` - Get single group
- `getAllGroups()` - Get all user's groups (filtered by userId)
- `updateGroup(groupId, updates)` - Update group
- `deleteGroup(groupId)` - Soft delete (set isActive: false)
- `addMemberToGroup(groupId, member)` - Add member
- `removeMemberFromGroup(groupId, memberId)` - Remove member
- `subscribeToGroup(groupId, callback)` - Real-time single group
- `subscribeToAllGroups(callback)` - Real-time all groups

### paymentService.js

- `addPayment(groupId, paymentData)` - Add payment
- `updatePayment(groupId, paymentId, updates)` - Update payment
- `deletePayment(groupId, paymentId)` - Delete payment
- `getGroupPayments(groupId)` - Get all payments
- `getPayment(groupId, paymentId)` - Get single payment

### settlementService.js

- `addSettlement(groupId, settlementData)` - Record settlement
- `getGroupSettlements(groupId)` - Get all settlements
- `updateSettlement(groupId, settlementId, updates)` - Update
- `clearSettlements(groupId)` - Clear all settlements

### authService.js

- `loginWithEmail(email, password)` - Email/password login
- `signupWithEmail(email, password, firstName, lastName)` - Register
- `loginWithGoogle()` - Google popup authentication
- `logoutUser()` - Sign out
- `resetPassword(email)` - Send password reset email
- `updateUserProfile(updates)` - Update profile

---

## Security Rules

Located in `firestore.rules`:

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

---

## Key Features

### Real-time Synchronization

- Uses Firestore's `onSnapshot()` listeners
- Changes propagate instantly to all connected clients
- WebSocket connection maintained automatically
- Automatic reconnection on network issues

### User Data Isolation

- Groups filtered by `userId` field
- Each user only sees their own groups
- Security rules enforce isolation at database level
- No cross-user data access possible

### Optimistic Updates

- UI updates immediately before server confirmation
- Automatic rollback on errors
- Better user experience with instant feedback

### Error Handling

- Service layer returns `{ success, data, error }` objects
- Contexts handle errors gracefully
- User-friendly error messages displayed
- Console logging for debugging

---

## Performance Optimizations

- Lazy loading of route components with `React.lazy()`
- Real-time listeners only for active groups
- Efficient Firestore queries with proper indexing
- Suspense boundaries for loading states

---

## Next Steps

For more details, see:

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Setup instructions
- [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md) - Auth details
- [../README.md](../README.md) - Project overview
