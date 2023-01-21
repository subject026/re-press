import type { ReactNode } from "react";
import type { TAdminLoaderData } from "../../../routes/admin";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";

interface IProps {
  user: TAdminLoaderData["user"];
  children: ReactNode;
}

export default function AdminLayout({ user, children }: IProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
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
