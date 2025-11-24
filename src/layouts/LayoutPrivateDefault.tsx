import { Outlet } from "react-router-dom";

export default function LayoutPrivateDefault() {
  return (
    <main className="layout-private-default">
      <section className="w-full">
        <section className="container mx-auto p-4">
          <Outlet />
        </section>
      </section>
    </main>
  );
}
