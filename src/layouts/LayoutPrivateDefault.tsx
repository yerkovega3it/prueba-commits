import { Outlet } from "react-router-dom";

export default function LayoutPrivateDefault() {
  return (
    <main>
      <section className="w-full">
        <section className="mx-auto p-4">
          <Outlet />
        </section>
      </section>
    </main>
  );
}
