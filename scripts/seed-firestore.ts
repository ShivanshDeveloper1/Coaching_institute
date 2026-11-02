import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import {
  mockCourses,
  mockCourseAccess,
  mockEnquiries,
  mockPurchases,
  mockSiteSettings,
  mockUsers,
} from "../lib/firebase/mock-data";

const requiredEnv = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];

const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length) {
  console.error("Missing Firebase admin environment variables:", missing.join(", "));
  console.error("Add them to .env.local before running the seed script.");
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

async function seedCollection<T extends Record<string, unknown>>(collectionName: string, documents: T[]) {
  const batch = db.batch();

  documents.forEach((doc) => {
    const documentId = String(doc.id ?? `${collectionName}-item`);
    const ref = db.collection(collectionName).doc(documentId);
    batch.set(ref, doc);
  });

  await batch.commit();
  console.log(`Seeded ${documents.length} documents in ${collectionName}`);
}

async function seedFirestore() {
  await seedCollection("users", mockUsers);
  await seedCollection("courses", mockCourses);
  await seedCollection("enquiries", mockEnquiries);
  await seedCollection("purchases", mockPurchases);
  await seedCollection("courseAccess", mockCourseAccess);
  await db.collection("siteSettings").doc("institute").set(mockSiteSettings);

  console.log("Firestore mock data has been seeded successfully.");
}

seedFirestore().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
