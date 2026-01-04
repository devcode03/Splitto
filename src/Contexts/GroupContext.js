import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { subscribeToAllGroups, updateGroup as updateGroupService, createGroup as createGroupService } from "../services/firebase/groupService";
import { addPayment as addPaymentService, updatePayment as updatePaymentService, deletePayment as deletePaymentService } from "../services/firebase/paymentService";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const GroupsContext = createContext();

function useGroups() {
  return useContext(GroupsContext);
}

function GroupProvider({ children }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // Wait for auth to initialize
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthReady(true);
    });
    return unsubscribe;
  }, []);

  // Subscribe to real-time updates from Firebase AFTER auth is ready
  useEffect(() => {
    if (!authReady) {
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToAllGroups((result) => {
      if (result.success) {
        setGroups(result.data);
        setError(null);
      } else {
        setError(result.error);
        console.error("Error loading groups:", result.error);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [authReady]);

  const updateGroup = useCallback(async (groupID, updateFields) => {
    // Store previous state for rollback
    const previousGroups = [...groups];

    // Optimistically update local state
    setGroups((prev) =>
      prev.map((g) => (g.groupID === groupID ? { ...g, ...updateFields } : g))
    );

    // Update in Firebase
    const result = await updateGroupService(groupID, updateFields);
    if (!result.success) {
      setGroups(previousGroups);
      setError(result.error);
      console.error("Error updating group:", result.error);
      return { success: false, error: result.error };
    }
    return result;
  }, [groups]);

  const createGroup = useCallback(async (groupData) => {
    // Create in Firebase first
    const result = await createGroupService(groupData);

    if (!result.success) {
      setError(result.error);
      console.error("Error creating group:", result.error);
      return result;
    }

    // Add a small delay to ensure Firebase real-time subscription catches up
    // This prevents "group not found" errors when navigating immediately
    await new Promise(resolve => setTimeout(resolve, 100));

    // If group still not in state after delay, add it manually
    setGroups((prev) => {
      const exists = prev.some((g) => g.groupID === groupData.groupID);
      if (exists) return prev; // Already added by subscription

      // Add with Firebase fields structure
      return [{
        ...groupData,
        createdAt: { toMillis: () => Date.now() }, // Temporary until subscription updates
        updatedAt: { toMillis: () => Date.now() },
      }, ...prev];
    });

    return result;
  }, []);

  const addPayment = useCallback(async (groupID, paymentData) => {
    // Optimistically add payment to local state
    setGroups((prev) =>
      prev.map((g) => {
        if (g.groupID === groupID) {
          const updatedPayments = [...(g.payments || []), paymentData];
          return { ...g, payments: updatedPayments };
        }
        return g;
      })
    );

    // Add to Firebase
    const result = await addPaymentService(groupID, paymentData);

    if (!result.success) {
      // Rollback on failure
      setGroups((prev) =>
        prev.map((g) => {
          if (g.groupID === groupID) {
            const rollbackPayments = (g.payments || []).filter(
              (p) => p.id !== paymentData.id
            );
            return { ...g, payments: rollbackPayments };
          }
          return g;
        })
      );
      setError(result.error);
      console.error("Error adding payment:", result.error);
    }

    return result;
  }, []);

  const updatePayment = useCallback(async (groupID, paymentID, updates) => {
    // Store previous state for rollback
    const previousGroups = [...groups];

    // Optimistically update payment in local state
    setGroups((prev) =>
      prev.map((g) => {
        if (g.groupID === groupID) {
          const updatedPayments = (g.payments || []).map((p) =>
            p.id === paymentID ? { ...p, ...updates } : p
          );
          return { ...g, payments: updatedPayments };
        }
        return g;
      })
    );

    // Update in Firebase
    const result = await updatePaymentService(groupID, paymentID, updates);

    if (!result.success) {
      // Rollback on failure
      setGroups(previousGroups);
      setError(result.error);
      console.error("Error updating payment:", result.error);
    }

    return result;
  }, [groups]);

  const deletePayment = useCallback(async (groupID, paymentID) => {
    // Store previous state for rollback
    const previousGroups = [...groups];

    // Optimistically remove payment from local state
    setGroups((prev) =>
      prev.map((g) => {
        if (g.groupID === groupID) {
          const updatedPayments = (g.payments || []).filter(
            (p) => p.id !== paymentID
          );
          return { ...g, payments: updatedPayments };
        }
        return g;
      })
    );

    // Delete from Firebase
    const result = await deletePaymentService(groupID, paymentID);

    if (!result.success) {
      // Rollback on failure
      setGroups(previousGroups);
      setError(result.error);
      console.error("Error deleting payment:", result.error);
    }

    return result;
  }, [groups]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      groups,
      setGroups,
      updateGroup,
      createGroup,
      addPayment,
      updatePayment,
      deletePayment,
      loading,
      error
    }),
    [groups, loading, error, updateGroup, createGroup, addPayment, updatePayment, deletePayment]
  );

  return (
    <GroupsContext.Provider value={contextValue}>
      {children}
    </GroupsContext.Provider>
  );
}

export { GroupProvider, useGroups };
