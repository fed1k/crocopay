import { db } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const login = async (token) => {
  try {
    const userRef = doc(db, "users", token); // token = document ID
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return { status: 200, user: { ...userData, token } };
    } else {
      return { status: 401, message: "User not found" };
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export const registerUser = async (name) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      admin: false,
      name,
      balance: 0,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const getMe = async (doc_id) => {
  try {
    const userRef = doc(db, "users", doc_id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User not found");
    }

    return {
      token: userSnap.id,
      ...userSnap.data(),
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => ({
      token: doc.id,
      ...doc.data(),
    }));
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteUser = async (doc_id) => {
  try {
    await deleteDoc(doc(db, "users", doc_id));
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const createPayment = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "payments"), {
      amount: data.amount, // example field
      status: "pending",
      date: new Date(),
      user_id: data.user_id,
      name: data.name,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const getAllPaymentsAdmin = async () => {
  try {
    const paymentsRef = collection(db, "payments");
    const querySnapshot = await getDocs(paymentsRef);

    const payments = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const rawDate = data.date?.toDate();

      const formattedDate = rawDate
        ? `${String(rawDate.getDate()).padStart(2, "0")}.${String(
            rawDate.getMonth() + 1
          ).padStart(2, "0")}.${rawDate.getFullYear()} ${String(
            rawDate.getHours()
          ).padStart(2, "0")}:${String(rawDate.getMinutes()).padStart(2, "0")}`
        : null;

      return {
        id: doc.id,
        ...data,
        date: formattedDate,
      };
    });

    return payments;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};

export const markPaymentAdmin = async (doc_id, status) => {
  try {
    const paymentRef = doc(db, "payments", doc_id);

    // Get the payment document
    const paymentSnap = await getDoc(paymentRef);

    if (!paymentSnap.exists()) {
      throw new Error("Payment document not found");
    }

    const paymentData = paymentSnap.data();

    // Update payment status
    await updateDoc(paymentRef, { status });

    // If status is approved, update the user's amount
    if (status === "approved") {
      const userId = paymentData.user_id;
      const paymentAmount = paymentData.amount;

      if (!userId || paymentAmount == null) {
        throw new Error("Missing userId or amount in payment document");
      }

      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        throw new Error("User not found");
      }

      const userData = userSnap.data();
      const currentAmount = userData.amount || 0;

      await updateDoc(userRef, {
        balance: currentAmount + paymentAmount,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error in markPaymentAdmin:", error);
    throw error;
  }
};

export const updateProfile = async (fieldName, value, doc_id) => {
  try {
    const userRef = doc(db, "users", doc_id); // assumes 'users' collection
    await updateDoc(userRef, {
      [fieldName]: value, // dynamic field update
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const createReq = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "requisites"), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const getUserReqs = async (user_id) => {
  console.log(user_id)
  try {
    // Reference to the 'requisites' collection
    const requisitesCollection = collection(db, "requisites");

    // Create a query to filter requisites by user_id
    const q = query(requisitesCollection, where("user_id", "==", user_id));

    // Execute the query and get the results
    const querySnapshot = await getDocs(q);

    // Create an array to hold the results
    const requisites = [];

    // Loop through the documents in the query snapshot
    querySnapshot.forEach((doc) => {
      requisites.push({
        id: doc.id, // Document ID
        ...doc.data(), // Document data
      });
    });

    // Return the list of requisites
    return requisites;
  } catch (error) {
    console.error("Error getting requisites:", error);
    throw new Error("Failed to get requisites");
  }
};

export const createDevice = () => {
  console.log("created device");
};
