import { redirect } from "@remix-run/node";

import type { LoaderArgs } from "@remix-run/node";

import { getUserId } from "~/core/resources/Auth/AuthController.server";
import { useRouteLoaderData } from "@remix-run/react";

import AdminLayout from "../../core/components/AdminLayout";
import type { TAdminLoaderData } from "../admin";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  return null;
}

export default function AdminIndex() {
  const { user } = useRouteLoaderData("routes/admin") as TAdminLoaderData;
  return (
    <AdminLayout user={user}>
      <h2>Admin Index</h2>
    </AdminLayout>
  );
}
