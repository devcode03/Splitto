import { useState, useEffect } from "react";
import {
    createGroup,
    updateGroup,
    deleteGroup,
    subscribeToGroup,
    subscribeToAllGroups,
    updateGroupMembers
} from "../services/firebase/groupService";

// Hook to manage all groups with real-time updates
export const useFirebaseGroups = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        // Subscribe to real-time updates
        const unsubscribe = subscribeToAllGroups((result) => {
            if (result.success) {
                setGroups(result.data);
                setError(null);
            } else {
                setError(result.error);
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const addGroup = async (groupData) => {
        const result = await createGroup(groupData);
        if (!result.success) {
            setError(result.error);
        }
        return result;
    };

    const updateGroupData = async (groupId, updates) => {
        const result = await updateGroup(groupId, updates);
        if (!result.success) {
            setError(result.error);
        }
        return result;
    };

    const removeGroup = async (groupId) => {
        const result = await deleteGroup(groupId);
        if (!result.success) {
            setError(result.error);
        }
        return result;
    };

    const updateMembers = async (groupId, members) => {
        const result = await updateGroupMembers(groupId, members);
        if (!result.success) {
            setError(result.error);
        }
        return result;
    };

    return {
        groups,
        loading,
        error,
        addGroup,
        updateGroupData,
        removeGroup,
        updateMembers,
        setGroups
    };
};

// Hook to manage a single group with real-time updates
export const useFirebaseGroup = (groupId) => {
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!groupId) {
            setLoading(false);
            return;
        }

        setLoading(true);

        // Subscribe to real-time updates for this specific group
        const unsubscribe = subscribeToGroup(groupId, (result) => {
            if (result.success) {
                setGroup(result.data);
                setError(null);
            } else {
                setError(result.error);
                setGroup(null);
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [groupId]);

    const updateGroupData = async (updates) => {
        const result = await updateGroup(groupId, updates);
        if (!result.success) {
            setError(result.error);
        }
        return result;
    };

    return {
        group,
        loading,
        error,
        updateGroupData
    };
};
