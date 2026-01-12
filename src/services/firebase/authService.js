import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "../../config/firebase";

// Login with email and password
export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error("Error logging in:", error);
        let errorMessage = "Failed to login. Please try again.";

        switch (error.code) {
            case "auth/user-not-found":
                errorMessage = "No account found with this email.";
                break;
            case "auth/wrong-password":
                errorMessage = "Incorrect password.";
                break;
            case "auth/invalid-email":
                errorMessage = "Invalid email address.";
                break;
            case "auth/user-disabled":
                errorMessage = "This account has been disabled.";
                break;
            case "auth/too-many-requests":
                errorMessage = "Too many failed attempts. Please try again later.";
                break;
            case "auth/invalid-credential":
                errorMessage = "Invalid email or password.";
                break;
            default:
                errorMessage = error.message;
        }

        return { success: false, error: errorMessage };
    }
};

// Signup with email and password
export const signupWithEmail = async (email, password, firstName, lastName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update user profile with display name
        await updateProfile(user, {
            displayName: `${firstName} ${lastName}`
        });

        // Create user document in Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            firstName: firstName,
            lastName: lastName,
            displayName: `${firstName} ${lastName}`,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            photoURL: user.photoURL || null
        });

        return { success: true, user: user };
    } catch (error) {
        console.error("Error signing up:", error);
        let errorMessage = "Failed to create account. Please try again.";

        switch (error.code) {
            case "auth/email-already-in-use":
                errorMessage = "An account with this email already exists.";
                break;
            case "auth/invalid-email":
                errorMessage = "Invalid email address.";
                break;
            case "auth/weak-password":
                errorMessage = "Password should be at least 6 characters.";
                break;
            default:
                errorMessage = error.message;
        }

        return { success: false, error: errorMessage };
    }
};

// Login with Google
export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Check if user document exists, create if not
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (!userDoc.exists()) {
            // Extract first and last name from display name
            const nameParts = user.displayName ? user.displayName.split(" ") : ["", ""];
            const firstName = nameParts[0] || "";
            const lastName = nameParts.slice(1).join(" ") || "";

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                firstName: firstName,
                lastName: lastName,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            });
        }

        return { success: true, user: user };
    } catch (error) {
        console.error("Error logging in with Google:", error);
        let errorMessage = "Failed to login with Google. Please try again.";

        switch (error.code) {
            case "auth/popup-closed-by-user":
                errorMessage = "Login cancelled.";
                break;
            case "auth/popup-blocked":
                errorMessage = "Popup blocked. Please allow popups for this site.";
                break;
            default:
                errorMessage = error.message;
        }

        return { success: false, error: errorMessage };
    }
};

// Logout
export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error("Error logging out:", error);
        return { success: false, error: error.message };
    }
};

// Reset password
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error) {
        console.error("Error sending password reset email:", error);
        let errorMessage = "Failed to send reset email. Please try again.";

        switch (error.code) {
            case "auth/user-not-found":
                // For security: Don't reveal if email exists or not
                // Return success to prevent email enumeration
                return { success: true };
            case "auth/invalid-email":
                errorMessage = "Invalid email address.";
                break;
            case "auth/too-many-requests":
                errorMessage = "Too many attempts. Please try again later.";
                break;
            default:
                errorMessage = error.message;
        }

        return { success: false, error: errorMessage };
    }
};

// Update user profile
export const updateUserProfile = async (updates) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            return { success: false, error: "No user logged in" };
        }

        // Update Firebase Auth profile
        await updateProfile(user, updates);

        // Update Firestore user document
        await setDoc(doc(db, "users", user.uid), {
            ...updates,
            updatedAt: Timestamp.now()
        }, { merge: true });

        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { success: false, error: error.message };
    }
};
