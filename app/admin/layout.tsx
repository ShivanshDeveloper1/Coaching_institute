import SideBar from "@/components/(admin)/SideBar";
import Navbar from "@/components/(admin)/Navbar";
import AdminGuard from "@/components/(admin)/AdminGuard";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <main className="flex h-screen w-full overflow-hidden bg-[var(--bg)] text-[var(--ink)]">
        {/* Responsive Sidebar */}
        <SideBar />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col h-full overflow-y-auto relative bg-[var(--bg)]">
          <Navbar />
          <div className="w-full flex-1">
            {children}
          </div>
        </div>
      </main>
    </AdminGuard>
  );
}
