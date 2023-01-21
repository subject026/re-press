import type { SerializeFrom } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import type { ReactNode } from "react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Sidebar from "~/components/Sidebar";
import type { loader as adminLoader } from "~/routes/admin";

interface IProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: IProps) {
  const { user } = useRouteLoaderData("routes/admin") as SerializeFrom<
    typeof adminLoader
  >;

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
