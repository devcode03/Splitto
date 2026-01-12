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
  const [currentUser, setCurrentUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // Wait for auth to initialize and track current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthReady(true);
    });
    return unsubscribe;
  }, []);

  // Subscribe to real-time updates from Firebase when user changes
  useEffect(() => {
    if (!authReady) {
      return;
    }

    // Reset groups when user changes (logout/login)
    if (!currentUser) {
      setGroups([]);
      setLoading(false);
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

    // Cleanup subscription on unmount or when user changes
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [authReady, currentUser]);

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
    const result = await createGroupService(groupData);

    if (!result.success) {
      setError(result.error);
      return result;
    }

    // Wait for the group to appear in state via subscription
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (groups.some(g => g.groupID === groupData.groupID)) {
          clearInterval(checkInterval);
          resolve(result);
        }
      }, 50);

      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve(result);
      }, 5000);
    });
  }, [groups]);

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
