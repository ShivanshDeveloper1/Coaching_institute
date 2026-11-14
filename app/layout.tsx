import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "../components/site-shell";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "ConceptnSolution | Coaching Institute",
  description: "Modern coaching institute website for school preparation, foundation courses, and JEE/NEET guidance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SiteShell>{children}</SiteShell>
        </AuthProvider>
      </body>
    </html>
  );
}
