import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full px-6 py-2 text-white overflow-hidden flex flex-col">
      <div className="flex flex-col gap-6 max-w-[2040px] h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
