import type { Metadata } from "next";
import { LoginPageClient } from "../../components/login-page-client";

export const metadata: Metadata = {
  title: "Login | ConceptnSolution",
  description:
    "Sign in to your ConceptnSolution account to access admin tools, student dashboards, course progress, and modern coaching resources.",
  keywords: [
    "coaching institute login",
    "student portal",
    "admin login",
    "ConceptnSolution dashboard",
    "admission login",
  ],
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "Login | ConceptnSolution",
    description:
      "Secure student and admin access for your coaching institute portal and dashboard.",
    url: "/login",
    siteName: "ConceptnSolution",
    type: "website",
  },
};

export default function LoginPage() {
  return <LoginPageClient />;
}
