import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full xl:h-full px-3 py-1 sm:px-4 md:px-5 xl:px-6 xl:py-2 text-white xl:overflow-hidden flex flex-col">
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 xl:gap-6 max-w-[2040px] xl:h-full xl:overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
