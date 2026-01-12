import {
    doc,
    getDoc,
    updateDoc,
    Timestamp,
    runTransaction,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";
import { db } from "../../config/firebase";

const GROUPS_COLLECTION = "groups";

// Add payment to a group
export const addPayment = async (groupId, paymentData) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
            const currentPayments = groupSnap.data().payments || [];
            const newPayment = {
                ...paymentData,
                createdAt: Timestamp.now()
            };

            const updatedPayments = [...currentPayments, newPayment];

            await updateDoc(groupRef, {
                payments: updatedPayments,
                updatedAt: Timestamp.now()
            });

            return { success: true, paymentId: paymentData.id };
        }
        return { success: false, error: "Group not found" };
    } catch (error) {
        console.error("Error adding payment:", error);
        return { success: false, error: error.message };
    }
};

// Update a payment in a group
export const updatePayment = async (groupId, paymentId, updates) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
            const currentPayments = groupSnap.data().payments || [];
            const updatedPayments = currentPayments.map(payment =>
                payment.id === paymentId
                    ? { ...payment, ...updates, updatedAt: Timestamp.now() }
                    : payment
            );

            await updateDoc(groupRef, {
                payments: updatedPayments,
                updatedAt: Timestamp.now()
            });

            return { success: true };
        }
        return { success: false, error: "Group not found" };
    } catch (error) {
        console.error("Error updating payment:", error);
        return { success: false, error: error.message };
    }
};

// Delete a payment from a group
export const deletePayment = async (groupId, paymentId) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
            const currentPayments = groupSnap.data().payments || [];
            const updatedPayments = currentPayments.filter(payment => payment.id !== paymentId);

            await updateDoc(groupRef, {
                payments: updatedPayments,
                updatedAt: Timestamp.now()
            });

            return { success: true };
        }
        return { success: false, error: "Group not found" };
    } catch (error) {
        console.error("Error deleting payment:", error);
        return { success: false, error: error.message };
    }
};

// Get all payments for a group
export const getGroupPayments = async (groupId) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
            const payments = groupSnap.data().payments || [];
            return { success: true, data: payments };
        }
        return { success: false, error: "Group not found" };
    } catch (error) {
        console.error("Error getting payments:", error);
        return { success: false, error: error.message };
    }
};

// Get a single payment by ID
export const getPayment = async (groupId, paymentId) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
            const payments = groupSnap.data().payments || [];
            const payment = payments.find(p => p.id === paymentId);

            if (payment) {
                return { success: true, data: payment };
            }
            return { success: false, error: "Payment not found" };
        }
        return { success: false, error: "Group not found" };
    } catch (error) {
        console.error("Error getting payment:", error);
        return { success: false, error: error.message };
    }
};
