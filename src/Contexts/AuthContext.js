import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import {
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    logoutUser,
    resetPassword,
    updateUserProfile
} from "../services/firebase/authService";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Login with email and password
    async function login(email, password) {
        setError(null);
        const result = await loginWithEmail(email, password);
        if (!result.success) {
            setError(result.error);
        }
        return result;
    }

    // Signup with email and password
    async function signup(email, password, firstName, lastName) {
        setError(null);
        const result = await signupWithEmail(email, password, firstName, lastName);
        if (!result.success) {
            setError(result.error);
        }
        return result;
    }

    // Login with Google
    async function loginGoogle() {
        setError(null);
        const result = await loginWithGoogle();
        if (!result.success) {
            setError(result.error);
        }
        return result;
    }

    // Logout
    async function logout() {
        setError(null);
        const result = await logoutUser();
        if (!result.success) {
            setError(result.error);
        }
        return result;
    }

    // Reset password
    async function forgotPassword(email) {
        setError(null);
        const result = await resetPassword(email);
        if (!result.success) {
            setError(result.error);
        }
        return result;
    }

    // Update profile
    async function updateProfile(updates) {
        setError(null);
        const result = await updateUserProfile(updates);
        if (!result.success) {
            setError(result.error);
        }
        return result;
    }

    const value = {
        currentUser,
        login,
        signup,
        loginGoogle,
        logout,
        forgotPassword,
        updateProfile,
        error,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
