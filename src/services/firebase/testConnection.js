import { auth, db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

// Test Firebase connection
async function testFirebaseConnection() {
    console.log("🔍 Testing Firebase connection...");

    try {
        // Test Firestore
        const testCollection = collection(db, "groups");
        const snapshot = await getDocs(testCollection);
        console.log("✅ Firestore connected successfully");
        console.log(`📊 Found ${snapshot.size} documents in groups collection`);

        // Log each group
        snapshot.forEach((doc) => {
            const data = doc.data();
            console.log(`  📄 Group: ${doc.id}`, {
                name: data.name,
                userId: data.userId,
                isActive: data.isActive,
                membersCount: data.members?.length
            });
        });

        // Test Auth
        const user = auth.currentUser;
        if (user) {
            console.log("✅ User authenticated:");
            console.log("   Email:", user.email);
            console.log("   UID:", user.uid);
            console.log("   Display Name:", user.displayName);
        } else {
            console.log("⚠️ No user currently authenticated");
            console.log("   Please login to see your groups");
        }

        return true;
    } catch (error) {
        console.error("❌ Firebase connection error:", error);
        return false;
    }
}

// Make it available in browser console
if (typeof window !== 'undefined') {
    window.testFirebase = testFirebaseConnection;
}

// Run test on load (wait for auth to initialize)
setTimeout(() => {
    testFirebaseConnection();
}, 2000);

