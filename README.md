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

- **No registration required**: Use instantly in your browser.
- **Supports all currencies**: Choose your local or travel currency.
- **Shareable group links**: Invite friends by sharing a simple URL.
- **Mobile-friendly**: Works great on any device.

---

## Features

- 🚀 **Create Groups**: Start a new group for any event or trip.
- 👥 **Add Members**: Add friends, family, or colleagues to your group.
- 💸 **Record Payments**: Log who paid, what for, and how much.
- 🌍 **Multi-Currency Support**: Select from a wide range of currencies.
- 🧮 **Automatic Settlement Calculation**: Instantly see who owes whom and how much, with the simplest possible transactions.
- 🔗 **Share Group Link**: Copy and share your group page with others.
- 🛡️ **No Login Needed**: Privacy-first, no accounts or passwords.

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
  ├── App.js                # Main app routing and layout
  ├── Components/           # Reusable UI components (Header, Footer, GroupList, Button, etc.)
  ├── Contexts/             # React Context for group state management
  ├── Pages/                # Main pages (HomePage, Group, Payment, NewGroup)
  ├── Utils/                # Utility functions (e.g., calculateBalances.js)
  ├── styles/               # CSS files (index.css, one.css, etc.)
  ├── assets/               # Images and cover art
  └── firebase/             # Firebase configuration (for future cloud sync)
```

**Key Files:**

- `App.js`: Sets up routes and main layout.
- `GroupContext.js`: Provides global state for groups and payments.
- `calculateBalances.js`: Contains the logic for splitting expenses and minimizing transactions.
- `NewGroup-v2.js`: Modern group creation flow with currency selection and member management.
- `Group.js`: Displays group details, payments, and settlement instructions.

---

## Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

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

3. **Start the development server:**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000).

---

## Usage

### 1. Create a Group

- Click **Get Started** on the homepage.
- Enter a group name, add at least two members, and select your currency.
- Click **Create a group**.

### 2. Add Payments

- On your group page, click **Add a payment**.
- Fill in the payer, description, amount, and select who shares the expense.
- Save the payment.

### 3. View Settlements

- The group page shows all payments and the minimal set of transactions needed to settle up.
- Share the group link with others so everyone can view or add expenses.

### Example Screenshot

<p align="center">
  <img src="src/assets/feature1-Y8fuDCPZ.webp" alt="Splitto Screenshot" width="60%" />
</p>

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
