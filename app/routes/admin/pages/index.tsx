import { redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";

import AdminLayout from "../../../core/components/AdminLayout";
import { getUserId } from "../../../core/resources/Auth/AuthController.server";
import type { TAdminLoaderData } from "../../admin";
import { useRouteLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  return null;
}

export default function AdminPagesIndex() {
  const { user } = useRouteLoaderData("routes/admin") as TAdminLoaderData;
  return (
    <AdminLayout user={user}>
      <h2>Pages</h2>
    </AdminLayout>
  );
}
