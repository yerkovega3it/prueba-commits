import { Outlet } from "react-router-dom";

export default function LayoutPrivateDefault() {
  return (
    <main className="h-screen overflow-hidden flex flex-col">
      <section className="w-full h-full flex flex-col overflow-hidden">
        <section className="h-full flex flex-col overflow-hidden">
          <Outlet />
        </section>
      </section>
    </main>
  );
}
