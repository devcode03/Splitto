# Splitto Documentation

Welcome to the Splitto documentation! This folder contains comprehensive guides for setting up, understanding, and working with the Splitto expense-splitting application.

## 📚 Available Documentation

### [SETUP_GUIDE.md](./SETUP_GUIDE.md)

**Complete setup and configuration instructions**

Covers:

- Quick 5-minute setup process
- Firebase Console configuration (Firestore + Authentication)
- Deployment of security rules
- Testing your setup
- Troubleshooting common issues
- Development scripts

**Start here if you're setting up Splitto for the first time!**

---

### [ARCHITECTURE.md](./ARCHITECTURE.md)

**System architecture and data flow diagrams**

Covers:

- Overall system architecture
- Authentication flow diagrams
- Data flow for creating groups and payments
- Real-time synchronization mechanism
- Component tree structure
- Context provider hierarchy
- Firestore database schema
- Service layer API reference
- Security rules explanation
- Performance optimizations

**Read this to understand how Splitto works internally!**

---

### [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md)

**Detailed authentication system documentation**

Covers:

- Authentication methods (Email/Password, Google)
- Security features and data isolation
- Login, Signup, and Password Reset pages
- Authentication context and service implementation
- User and group data structures
- Firestore security rules
- Protected vs public routes
- Usage examples and code snippets
- Testing authentication flows
- Error handling
- Styling and theming
- Best practices

**Reference this for authentication-specific implementation details!**

---

## 🚀 Quick Start

If you're new to Splitto:

1. **Clone the repository**

   ```bash
   git clone https://github.com/devcode03/Splitto.git
   cd Splitto/Splitto
   ```

2. **Follow the [SETUP_GUIDE.md](./SETUP_GUIDE.md)** for step-by-step instructions

3. **Read [ARCHITECTURE.md](./ARCHITECTURE.md)** to understand the system

4. **Reference [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md)** for auth details

---

## 🛠️ Technology Stack

- **Frontend**: React 19, React Router
- **Backend**: Firebase
  - Firestore (Database)
  - Authentication (Email/Password + Google)
  - Analytics
- **State Management**: React Context API
- **Styling**: CSS with custom styling
- **Build Tool**: Create React App

---

## 📖 Additional Resources

### Main Project README

See [../README.md](../README.md) for:

- Project overview and features
- Screenshots and demo
- Contributing guidelines
- License information
- Contact information

### Firebase Resources

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

### React Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [React Context API](https://react.dev/reference/react/useContext)

---

## 🔧 Development Workflow

### Daily Development

1. Start development server: `npm start`
2. Make changes to code
3. Test in browser (hot reload enabled)
4. Commit changes

### Testing Authentication

1. Test signup with email/password
2. Test Google sign-in
3. Test password reset
4. Verify data isolation between users

### Testing Real-time Features

1. Open app in multiple browsers
2. Login with same account
3. Make changes in one browser
4. Verify instant sync in others

### Before Deployment

1. Run build: `npm run build`
2. Test production build locally
3. Deploy to Firebase/GitHub Pages
4. Verify all features work in production

---

## 🐛 Troubleshooting

### Common Issues

**"Firebase not initialized"**

- Run `npm install`
- Check `src/config/firebase.js` exists
- Verify Firebase config is correct

**"Permission denied" errors**

- Deploy Firestore rules: `firebase deploy --only firestore:rules`
- Ensure user is authenticated
- Check security rules in Firebase Console

**Groups not appearing**

- Verify Firestore database is created in Firebase Console
- Check that user is logged in
- Verify groups have `userId` field
- Check browser console for errors

**Real-time sync not working**

- Verify Firestore database is active
- Check network tab for WebSocket connection
- Ensure using same account across devices
- Check for JavaScript errors in console

For more troubleshooting tips, see [SETUP_GUIDE.md](./SETUP_GUIDE.md#troubleshooting)

---

## 📝 Documentation Updates

This documentation is current as of **January 4, 2026** and reflects the latest implementation with:

- ✅ Firebase Authentication (Email/Password + Google)
- ✅ Firestore real-time database
- ✅ User data isolation with security rules
- ✅ Protected routes with PrivateRoute component
- ✅ Real-time synchronization across devices
- ✅ Complete service layer for groups, payments, and settlements

---

## 🤝 Contributing to Documentation

If you find errors or want to improve the documentation:

1. Fork the repository
2. Make your changes
3. Submit a pull request with:
   - Clear description of changes
   - Reason for the update
   - Any related issues

---

## 📧 Support

For help with Splitto:

- **Issues**: [GitHub Issues](https://github.com/devcode03/Splitto/issues)
- **Discussions**: [GitHub Discussions](https://github.com/devcode03/Splitto/discussions)
- **Contact**: See [Contact page](../src/Components/Contact.js) in the app

---

## 📄 License

This documentation and the Splitto project are licensed under the [MIT License](../LICENSE).

---

<p align="center">
  <b>Happy documenting! 📚</b><br>
  <i>Keep the docs up-to-date so everyone can benefit!</i>
</p>
