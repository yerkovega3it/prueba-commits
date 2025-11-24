import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-4 bg-gray-900 text-white min-h-screen">
      <div className="flex flex-col gap-2 sm:gap-4 max-w-[1920px] mx-auto pb-4">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
