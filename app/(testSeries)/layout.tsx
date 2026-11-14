import type { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { QuizProvider } from "@/context/QuizContext";

export default function TestSeriesLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <QuizProvider>
        {children}
      </QuizProvider>
    </AuthProvider>
  );
}
