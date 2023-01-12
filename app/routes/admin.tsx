import { Outlet } from "@remix-run/react";
import Footer from "~/modules/admin/components/Footer";
import Header from "~/modules/admin/components/Header";
import Sidebar from "~/modules/admin/components/Sidebar";

export default function Admin() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-9">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
