import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    onSnapshot,
    query,
    where,
    Timestamp
} from "firebase/firestore";
import { db, auth } from "../../config/firebase";

const GROUPS_COLLECTION = "groups";

// Create a new group
export const createGroup = async (groupData) => {
    try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            return { success: false, error: "User not authenticated" };
        }

        const groupRef = doc(db, GROUPS_COLLECTION, groupData.groupID);
        const groupToSave = {
            ...groupData,
            userId: userId,
            createdBy: userId,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            isActive: true
        };
        await setDoc(groupRef, groupToSave);
        return { success: true, groupId: groupData.groupID };
    } catch (error) {
        console.error("Error creating group:", error);
        return { success: false, error: error.message };
    }
};

// Get a single group by ID
export const getGroup = async (groupId) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
            return { success: true, data: { ...groupSnap.data(), groupID: groupSnap.id } };
        } else {
            return { success: false, error: "Group not found" };
        }
    } catch (error) {
        console.error("Error getting group:", error);
        return { success: false, error: error.message };
    }
};

// Get all groups for current user
export const getAllGroups = async () => {
    try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            return { success: false, error: "User not authenticated" };
        }

        const groupsRef = collection(db, GROUPS_COLLECTION);
        const querySnapshot = await getDocs(groupsRef);

        const groups = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Filter active groups for current user on client side
            if (data.isActive !== false && data.userId === userId) {
                groups.push({ ...data, groupID: doc.id });
            }
        });

        // Sort by createdAt on client side
        groups.sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || 0;
            const bTime = b.createdAt?.toMillis?.() || 0;
            return bTime - aTime; // Descending order
        });

        return { success: true, data: groups };
    } catch (error) {
        console.error("Error getting groups:", error);
        return { success: false, error: error.message };
    }
};

// Update a group
export const updateGroup = async (groupId, updates) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        await updateDoc(groupRef, {
            ...updates,
            updatedAt: Timestamp.now()
        });
        return { success: true };
    } catch (error) {
        console.error("Error updating group:", error);
        return { success: false, error: error.message };
    }
};

// Delete a group (soft delete)
export const deleteGroup = async (groupId) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        await updateDoc(groupRef, {
            isActive: false,
            updatedAt: Timestamp.now()
        });
        return { success: true };
    } catch (error) {
        console.error("Error deleting group:", error);
        return { success: false, error: error.message };
    }
};

// Add member to group
export const addMemberToGroup = async (groupId, member) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
            const currentMembers = groupSnap.data().members || [];
            const updatedMembers = [...currentMembers, member];

            await updateDoc(groupRef, {
                members: updatedMembers,
                updatedAt: Timestamp.now()
            });

            return { success: true };
        }
        return { success: false, error: "Group not found" };
    } catch (error) {
        console.error("Error adding member:", error);
        return { success: false, error: error.message };
    }
};

// Remove member from group
export const removeMemberFromGroup = async (groupId, memberId) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
            const currentMembers = groupSnap.data().members || [];
            const updatedMembers = currentMembers.filter(m => m.id !== memberId);

            await updateDoc(groupRef, {
                members: updatedMembers,
                updatedAt: Timestamp.now()
            });

            return { success: true };
        }
        return { success: false, error: "Group not found" };
    } catch (error) {
        console.error("Error removing member:", error);
        return { success: false, error: error.message };
    }
};

// Subscribe to group changes (real-time)
export const subscribeToGroup = (groupId, callback) => {
    const groupRef = doc(db, GROUPS_COLLECTION, groupId);

    return onSnapshot(groupRef, (doc) => {
        if (doc.exists()) {
            callback({ success: true, data: { ...doc.data(), groupID: doc.id } });
        } else {
            callback({ success: false, error: "Group not found" });
        }
    }, (error) => {
        console.error("Error in group subscription:", error);
        callback({ success: false, error: error.message });
    });
};

// Subscribe to all groups (real-time) for current user
export const subscribeToAllGroups = (callback) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
        callback({ success: false, error: "User not authenticated" });
        return () => { };
    }

    const groupsRef = collection(db, GROUPS_COLLECTION);

    return onSnapshot(groupsRef, (snapshot) => {
        const groups = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            // Filter active groups for current user on client side
            if (data.isActive !== false && data.userId === userId) {
                groups.push({ ...data, groupID: doc.id });
            }
        });

        // Sort by createdAt on client side
        groups.sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || 0;
            const bTime = b.createdAt?.toMillis?.() || 0;
            return bTime - aTime; // Descending order
        });

        callback({ success: true, data: groups });
    }, (error) => {
        console.error("Error in groups subscription:", error);
        callback({ success: false, error: error.message });
    });
};// Update group members
export const updateGroupMembers = async (groupId, members) => {
    try {
        const groupRef = doc(db, GROUPS_COLLECTION, groupId);
        await updateDoc(groupRef, {
            members: members,
            updatedAt: Timestamp.now()
        });
        return { success: true };
    } catch (error) {
        console.error("Error updating members:", error);
        return { success: false, error: error.message };
    }
};
