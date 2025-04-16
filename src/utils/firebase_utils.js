import { db } from "@/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";

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

export const createReq = () => {
  console.log("created requisite");
};

export const createDevice = () => {
  console.log("created device");
};
