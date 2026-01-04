import {
    doc,
    getDoc,
    updateDoc,
    Timestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const GROUPS_COLLECTION = "groups";

// Add settlement to a group
export const addSettlement = async (groupId, settlementData) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
            const currentSettlements = groupSnap.data().settlements || [];
            const newSettlement = {
                ...settlementData,
                id: crypto.randomUUID(),
                settledAt: Timestamp.now()
            };

            const updatedSettlements = [...currentSettlements, newSettlement];

            await updateDoc(groupRef, {
                settlements: updatedSettlements,
                updatedAt: Timestamp.now()
            });

            return { success: true, settlementId: newSettlement.id };
        }
        return { success: false, error: "Group not found" };
    } catch (error) {
        console.error("Error adding settlement:", error);
        return { success: false, error: error.message };
    }
};

// Get all settlements for a group
export const getGroupSettlements = async (groupId) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
            const settlements = groupSnap.data().settlements || [];
            return { success: true, data: settlements };
        }
        return { success: false, error: "Group not found" };
    } catch (error) {
        console.error("Error getting settlements:", error);
        return { success: false, error: error.message };
    }
};

// Update settlement status
export const updateSettlement = async (groupId, settlementId, updates) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
            const currentSettlements = groupSnap.data().settlements || [];
            const updatedSettlements = currentSettlements.map(settlement =>
                settlement.id === settlementId
                    ? { ...settlement, ...updates, updatedAt: Timestamp.now() }
                    : settlement
            );

            await updateDoc(groupRef, {
                settlements: updatedSettlements,
                updatedAt: Timestamp.now()
            });

            return { success: true };
        }
        return { success: false, error: "Group not found" };
    } catch (error) {
        console.error("Error updating settlement:", error);
        return { success: false, error: error.message };
    }
};

// Clear all settlements for a group
export const clearSettlements = async (groupId) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        await updateDoc(groupRef, {
            settlements: [],
            updatedAt: Timestamp.now()
        });
        return { success: true };
    } catch (error) {
        console.error("Error clearing settlements:", error);
        return { success: false, error: error.message };
    }
};
