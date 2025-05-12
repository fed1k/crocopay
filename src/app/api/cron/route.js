// /app/api/check-payouts/route.js

import admin from "firebase-admin";

// Ensure Firebase Admin is initialized only once
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

export async function GET(request) {
  try {
    const snapshot = await db.collection("payOuts").get();
    const now = new Date();

    for (const doc of snapshot.docs) {
      const data = doc.data();

      // Process only if status is "Ожидает" and no attached document
      if (data.status !== "Ожидает" || data.document === true) continue;
      if (!data.paymentTime) continue;

      // Use either provided createdAt or fallback to Firestore's createTime
      const createdDate = data.createdAt?.toDate
        ? data.createdAt.toDate()
        : doc.createTime.toDate();

      // Parse paymentTime format "HH:mm"
      const [hourStr, minStr] = data.paymentTime.split(":");
      const targetTime = new Date(
        createdDate.getFullYear(),
        createdDate.getMonth(),
        createdDate.getDate(),
        parseInt(hourStr),
        parseInt(minStr)
      );

      if (now > targetTime) {
        await doc.ref.update({
          status: "Откланено",
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    }
    return new Response(JSON.stringify({ message: "Payout check complete." }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error checking payouts:", err);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
    });
  }
}
