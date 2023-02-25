import { redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import type { ReactNode } from "react";
import type { TAdminLoaderData } from "../../../routes/admin";
import { getUserId } from "../../resources/Auth/AuthController.server";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useRouteLoaderData } from "@remix-run/react";

interface IProps {
  children: ReactNode;
  user: { id: string; email: string } | null;
}

export default function AdminLayout({ children }: IProps) {
  const { user } = useRouteLoaderData("routes/admin") as TAdminLoaderData;

  console.log("user: ", user);

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
