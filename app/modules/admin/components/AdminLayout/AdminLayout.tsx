import type { ReactNode } from "react";
import Footer from "~/modules/admin/components/Footer";
import Header from "~/modules/admin/components/Header";
import Sidebar from "~/modules/admin/components/Sidebar";

interface IProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: IProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-9">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
