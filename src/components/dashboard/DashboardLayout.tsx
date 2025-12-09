import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-4 text-white">
      <div className="flex flex-col gap-4 sm:gap-6 max-w-[2040px] pb-4">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
