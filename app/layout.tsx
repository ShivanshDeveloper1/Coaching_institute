import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "../components/site-shell";

export const metadata: Metadata = {
  title: "Concept In Solution | Coaching Institute",
  description: "Modern coaching institute website for school preparation, foundation courses, and JEE/NEET guidance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
