import SideBar from "@/components/(admin)/SideBar";
import Navbar from "../../components/(admin)/Navbar";
import AdminGuard from "@/components/(admin)/AdminGuard";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminGuard>
      <main className="flex h-screen w-full overflow-hidden bg-background">
        {/* Assuming your Sidebar has a fixed width, it will sit perfectly here */}
        <SideBar />

        {/* Added overflow-y-auto so ONLY this side scrolls when content is long */}
        <div className="flex flex-1 flex-col h-full overflow-y-auto relative">
          <Navbar />
          {/* Added w-full to ensure it takes proper space */}
          <div className="w-full">
            {children}
          </div>
        </div>
      </main>
    </AdminGuard>
  );
};

export default layout;
