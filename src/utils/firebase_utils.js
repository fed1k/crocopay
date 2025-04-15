import { db } from "@/firebase"
import { doc, getDoc } from "firebase/firestore"

export const login = async (token) => {
  try {
    const userRef = doc(db, 'users', token) // token = document ID
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const userData = userSnap.data()
      return {status: 200, user: {...userData, token}}
      // console.log('Logged in:', userData)
      // You can store userData in state, context, localStorage, etc.
    } else {
      return {status: 401, message: "User not found"}
    }
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}

export const registerUser = () => {
  console.log("Registered new user as admin");
};

export const createReq = () => {
  console.log("created requisite");
};

export const createDevice = () => {
  console.log("created device");
};
