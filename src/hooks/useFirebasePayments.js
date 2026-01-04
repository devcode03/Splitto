import { useState, useCallback } from "react";
import {
    addPayment,
    updatePayment,
    deletePayment,
    getGroupPayments,
    getPayment
} from "../services/firebase/paymentService";

// Hook to manage payments for a group
export const useFirebasePayments = (groupId) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addNewPayment = useCallback(async (paymentData) => {
        setLoading(true);
        setError(null);

        const result = await addPayment(groupId, paymentData);

        setLoading(false);
        if (!result.success) {
            setError(result.error);
        }
        return result;
    }, [groupId]);

    const updateExistingPayment = useCallback(async (paymentId, updates) => {
        setLoading(true);
        setError(null);

        const result = await updatePayment(groupId, paymentId, updates);

        setLoading(false);
        if (!result.success) {
            setError(result.error);
        }
        return result;
    }, [groupId]);

    const removePayment = useCallback(async (paymentId) => {
        setLoading(true);
        setError(null);

        const result = await deletePayment(groupId, paymentId);

        setLoading(false);
        if (!result.success) {
            setError(result.error);
        }
        return result;
    }, [groupId]);

    const fetchPayments = useCallback(async () => {
        setLoading(true);
        setError(null);

        const result = await getGroupPayments(groupId);

        setLoading(false);
        if (!result.success) {
            setError(result.error);
            return [];
        }
        return result.data;
    }, [groupId]);

    const fetchPayment = useCallback(async (paymentId) => {
        setLoading(true);
        setError(null);

        const result = await getPayment(groupId, paymentId);

        setLoading(false);
        if (!result.success) {
            setError(result.error);
            return null;
        }
        return result.data;
    }, [groupId]);

    return {
        loading,
        error,
        addNewPayment,
        updateExistingPayment,
        removePayment,
        fetchPayments,
        fetchPayment
    };
};
