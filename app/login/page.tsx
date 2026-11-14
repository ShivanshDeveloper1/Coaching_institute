import type { Metadata } from "next";
import { LoginPageClient } from "../../components/login-page-client";

export const metadata: Metadata = {
  title: "Login | ConceptnSolution",
  description:
    "Sign in to your ConceptnSolution account to access student dashboards, test series, course progress, and modern coaching resources.",
  keywords: [
    "coaching institute login",
    "student portal",
    "test series login",
    "ConceptnSolution dashboard",
    "admission login",
  ],
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "Login | ConceptnSolution",
    description:
      "Secure student portal for your coaching institute dashboard and test series.",
    url: "/login",
    siteName: "ConceptnSolution",
    type: "website",
  },
};

export default function LoginPage() {
  return <LoginPageClient />;
}
