"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signOut as firebaseSignOut 
} from "firebase/auth";
import { auth, signInWithGoogle as clientSignInWithGoogle, isFirebaseConfigured } from "@/lib/firebase/client";

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: "admin" | "student";
  isAdmin?: boolean;
  isDemo?: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  isLoaded: boolean;
  loading: boolean;
  isSignedIn: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<AppUser | null>;
  loginAsDemoStudent: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_STUDENT: AppUser = {
  uid: "student-demo-user",
  email: "student@conceptinsolution.com",
  displayName: "Demo Student",
  photoURL: null,
  role: "student",
  isAdmin: false,
  isDemo: true,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if demo user is active in sessionStorage / localStorage for local testing
    if (typeof window !== "undefined") {
      const savedDemo = localStorage.getItem("demo_student_active");
      if (savedDemo === "true") {
        setUser(DEMO_STUDENT);
        setIsLoaded(true);
        return;
      }
    }

    if (!auth || !isFirebaseConfigured()) {
      // Firebase not configured yet: provide demo student fallback so student can test locally
      setUser(DEMO_STUDENT);
      setIsLoaded(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        let role: "admin" | "student" = "student";
        let isAdmin = false;

        try {
          const res = await fetch("/api/auth/sync-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              uid: fbUser.uid,
              email: fbUser.email,
              displayName: fbUser.displayName,
              photoURL: fbUser.photoURL,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data?.user) {
              role = data.user.role || "student";
              isAdmin = Boolean(data.user.isAdmin ?? (role === "admin"));
            }
          }
        } catch (e) {
          console.warn("Failed to sync user on auth state change:", e);
        }

        setUser({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName,
          photoURL: fbUser.photoURL,
          role,
          isAdmin,
        });
      } else {
        const isDemo = typeof window !== "undefined" && localStorage.getItem("demo_student_active") === "true";
        setUser(isDemo ? DEMO_STUDENT : null);
      }
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<AppUser | null> => {
    try {
      const result = await clientSignInWithGoogle();
      if (result.user) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("demo_student_active");
        }

        let role: "admin" | "student" = "student";
        let isAdmin = false;

        try {
          const res = await fetch("/api/auth/sync-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data?.user) {
              role = data.user.role || "student";
              isAdmin = Boolean(data.user.isAdmin ?? (role === "admin"));
            }
          }
        } catch (syncErr) {
          console.warn("User sync warning:", syncErr);
        }

        const appUser: AppUser = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          role,
          isAdmin,
        };

        setUser(appUser);
        return appUser;
      }
      return null;
    } catch (err) {
      console.error("Google sign in failed:", err);
      throw err;
    }
  };

  const loginAsDemoStudent = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("demo_student_active", "true");
    }
    setUser(DEMO_STUDENT);
  };

  const logout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("demo_student_active");
    }
    if (auth && isFirebaseConfigured()) {
      await firebaseSignOut(auth);
    }
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoaded,
    loading: !isLoaded,
    isSignedIn: Boolean(user),
    isAdmin: Boolean(user?.isAdmin),
    signInWithGoogle,
    loginAsDemoStudent,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Alias for compatibility with existing `app/(testSeries)/test-series/[id]/page.tsx`
export function useUser() {
  const authContext = useAuth();
  return {
    user: authContext.user,
    isLoaded: authContext.isLoaded,
    loading: authContext.loading,
    isSignedIn: authContext.isSignedIn,
    isAdmin: authContext.isAdmin,
  };
}
