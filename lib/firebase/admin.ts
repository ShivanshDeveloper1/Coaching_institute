import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

// Clean up the private key by trimming extra whitespace/quotes and fixing escaped newlines
let rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY || "";
// Remove surrounding quotes if they were accidentally included in .env.local
rawPrivateKey = rawPrivateKey.trim().replace(/^["']|["']$/g, "");
// Convert literal \n strings into actual newlines
const privateKey = rawPrivateKey ? rawPrivateKey.replace(/\\n/g, "\n") : undefined;

const hasPlaceholderValue = /YOUR_|PASTE_|REPLACE_|<your|example/i.test(
  `${projectId ?? ""}${clientEmail ?? ""}${privateKey ?? ""}`
);

const hasServiceAccount = Boolean(
  projectId &&
    clientEmail &&
    privateKey &&
    privateKey.includes("BEGIN PRIVATE KEY") &&
    !hasPlaceholderValue
);

if (!getApps().length) {
  if (hasServiceAccount) {
    try {
      initializeApp({
        credential: cert({
          projectId: projectId!,
          clientEmail: clientEmail!,
          privateKey: privateKey!,
        }),
        projectId: projectId!,
      });
    } catch (error) {
      console.error("Failed to initialize Firebase Admin SDK:", error);
    }
  }
}

export const adminAuth = getApps().length ? getAuth() : null;
export const adminDb = getApps().length ? getFirestore() : null;

export function isAdminConfigured() {
  return Boolean(hasServiceAccount && getApps().length > 0);
}