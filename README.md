<p align="center">
  <img src="src/assets/cover.webp" alt="Splitto Cover" width="60%" />
</p>

# Splitto

**Splitto** is a modern, intuitive web app for splitting group expenses with friends, family, or colleagues. Easily track payments, calculate who owes whom, and settle up with the simplest possible transactions—no registration or app install required!

<p align="center">
  <a href="https://devcode03.github.io/Splitto/"><img src="https://img.shields.io/badge/Live%20Demo-Online-brightgreen?style=flat-square" alt="Live Demo"></a>
  <img src="https://img.shields.io/github/license/devcode03/Splitto?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/React-19-blue?style=flat-square" alt="React">
  <img src="https://img.shields.io/badge/Firebase-Cloud-orange?style=flat-square" alt="Firebase">
</p>

---

## Table of Contents

- [About Splitto](#about-splitto)
- [Features](#features)
- [Screenshots](#screenshots)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact & Resources](#contact--resources)

---

## About Splitto

**Splitto** helps you and your group keep track of shared expenses and settle up with the minimum number of transactions. Whether you're traveling, dining out, or sharing household costs, Splitto makes bill splitting effortless and transparent.

- **Secure authentication**: Sign up with email/password or Google
- **Cloud sync with Firebase**: Your data syncs across all devices in real-time
- **Supports all currencies**: Choose your local or travel currency
- **Real-time collaboration**: Changes appear instantly for all group members
- **Mobile-friendly**: Works great on any device
- **Private & secure**: Each user sees only their own groups

---

## Features

- 🔐 **Authentication**: Secure login with email/password or Google
- 🚀 **Create Groups**: Start a new group for any event or trip
- 👥 **Add Members**: Add friends, family, or colleagues to your group
- 💸 **Record Payments**: Log who paid, what for, and how much
- 🌍 **Multi-Currency Support**: Select from a wide range of currencies
- 🧮 **Automatic Settlement Calculation**: Instantly see who owes whom and how much, with the simplest possible transactions
- ☁️ **Cloud Sync**: Real-time synchronization across all devices
- 🔗 **Share Group Link**: Copy and share your group page with others
- 🛡️ **Privacy & Security**: User data isolation with Firebase security rules
- ✏️ **Edit Groups & Payments**: Update group info or payment records anytime
- 📱 **Responsive Design**: Optimized for mobile and desktop
- ❓ **FAQ, Privacy, Terms, and Contact Pages**: Built-in info and support

---

## Screenshots

Below are some screenshots to give you a quick overview of Splitto's interface and features:

<p align="center">
  <img src="src/assets/screenShots/homepage.png" alt="Homepage" width="80%" />
  <br><em>Homepage: Get started with a clean, modern UI</em>
</p>

<p align="center">
  <img src="src/assets/screenShots/new-group.png" alt="Create Group" width="80%" />
  <br><em>Create a new group: Add members and select currency</em>
</p>

<p align="center">
  <img src="src/assets/screenShots/group-list.png" alt="Group List" width="80%" />
  <br><em>Group List: View and manage all your groups</em>
</p>

<p align="center">
  <img src="src/assets/screenShots/group-details.png" alt="Group Details" width="80%" />
  <br><em>Group Details: See payments, balances, and settlement instructions</em>
</p>

<p align="center">
  <img src="src/assets/screenShots/add-payment.png" alt="Add Payment" width="80%" />
  <br><em>Add a Payment: Record who paid, what for, and how much</em>
</p>

<p align="center">
  <img src="src/assets/screenShots/settlement.png" alt="Settlement" width="80%" />
  <br><em>Settlement: Minimal transactions to settle up</em>
</p>

<p align="center">
  <img src="src/assets/screenShots/faq.png" alt="FAQ" width="80%" />
  <br><em>FAQ: Find answers to common questions</em>
</p>

---

## How It Works

1. **Create a Group**: Enter a group name, add members, and select your currency.
2. **Add Payments**: For each expense, specify the payer, amount, description, and who shares the cost.
3. **View Settlements**: Splitto calculates each member's balance and suggests the minimal set of transactions to settle up.
4. **Share & Collaborate**: Share your group link so everyone can view or add expenses.

**Core Algorithm:**  
Splitto uses a balance calculation and a cash flow minimization algorithm to determine the simplest way to settle debts among group members. This ensures the fewest number of payments are needed for everyone to be even.

---

## Project Structure

```
src/
  ├── App.js                # Main app routing with authentication
  ├── Components/           # Reusable UI components (Header, Footer, GroupList, etc.)
  │   ├── PrivateRoute.js   # Protected route wrapper
  │   └── ...
  ├── Contexts/             # React Context providers
  │   ├── AuthContext.js    # Authentication state management
  │   ├── GroupContext.js   # Groups state with Firebase real-time sync
  │   └── CurrencyContext.js
  ├── Pages/                # Main pages
  │   ├── Login.js          # Login page
  │   ├── Signup.js         # Signup page
  │   ├── ForgotPassword.js # Password reset
  │   ├── HomePage.js       # Landing page
  │   ├── NewGroup-v2.js    # Group creation
  │   ├── Group.js          # Group details
  │   ├── EditGroup.js      # Edit group
  │   └── Payment.js        # Add/edit payment
  ├── services/
  │   └── firebase/
  │       ├── authService.js      # Authentication functions
  │       ├── groupService.js     # Group CRUD operations
  │       ├── paymentService.js   # Payment operations
  │       └── settlementService.js # Settlement operations
  ├── hooks/
  │   ├── useFirebaseGroups.js    # Groups hook with real-time updates
  │   └── useFirebasePayments.js  # Payments hook
  ├── config/
  │   └── firebase.js       # Firebase configuration
  ├── Utils/                # Utility functions (calculateBalances.js)
  ├── styles/               # CSS files (Auth.css, index.css, one.css)
  └── assets/               # Images and screenshots
```

**Key Files:**

- `App.js`: Sets up routes with authentication and main layout
- `AuthContext.js`: Manages authentication state globally
- `GroupContext.js`: Provides global state for groups with Firebase real-time sync
- `firebase.js`: Firebase configuration (Auth, Firestore, Analytics)
- `authService.js`: Email/password and Google authentication
- `groupService.js`: Group CRUD operations with Firestore
- `calculateBalances.js`: Logic for splitting expenses and minimizing transactions
- `NewGroup-v2.js`: Modern group creation flow with currency selection
- `Group.js`: Displays group details, payments, and settlement instructions

---

## Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Firebase account ([Get started free](https://firebase.google.com/))

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/devcode03/Splitto.git
   cd Splitto/Splitto
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Firebase Setup:**

   The Firebase configuration is already set up. You need to:

   - **Enable Firestore Database** in [Firebase Console](https://console.firebase.google.com/)
   - **Enable Authentication** (Email/Password + Google) in Firebase Console
   - **Deploy security rules** (optional but recommended):
     ```bash
     firebase deploy --only firestore:rules
     ```

   For detailed setup instructions, see [docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md)

4. **Start the development server:**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000).

For complete setup instructions, see the [Setup Guide](docs/SETUP_GUIDE.md).

---

## Usage

### 1. Sign Up / Login

- Visit the app and click **Sign Up** to create an account
- Use email/password or sign in with Google
- Your groups will sync across all your devices

### 2. Create a Group

- Click **Create New Group** on the homepage
- Enter a group name, add at least two members, and select your currency
- Click **Create a group**

### 3. Add Payments

- On your group page, click **Add a payment**
- Fill in the payer, description, amount, and select who shares the expense
- Save the payment - it syncs in real-time!

### 4. View Settlements

- The group page shows all payments and the minimal set of transactions needed to settle up
- Share the group link with others so everyone can view or add expenses
- All changes sync instantly across all devices

---

## Deployment

Splitto is ready for deployment on [GitHub Pages](https://pages.github.com/):

1. **Build the app:**

   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

The app will be live at:  
[https://devcode03.github.io/Splitto/](https://devcode03.github.io/Splitto/)

**Note:** Make sure Firebase configuration is set up for production deployment.

---

## Documentation

- **[Setup Guide](docs/SETUP_GUIDE.md)** - Complete setup and configuration instructions
- **[Architecture](docs/ARCHITECTURE.md)** - System architecture and data flow diagrams
- **[Authentication Guide](docs/AUTHENTICATION_GUIDE.md)** - Authentication system details

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request.

Please follow the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact & Resources

- **Author:** [devcode03](https://github.com/devcode03)
- **Live Demo:** [https://devcode03.github.io/Splitto/](https://devcode03.github.io/Splitto/)
- **Issues:** [GitHub Issues](https://github.com/devcode03/Splitto/issues)
- **React Documentation:** [https://reactjs.org/](https://reactjs.org/)
- **Firebase:** [https://firebase.google.com/](https://firebase.google.com/)

---

<p align="center">
  <b>Split expenses, not friendships! 🚀</b>
</p>
