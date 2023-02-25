import { redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { getUserId } from "~/core/resources/Auth/AuthController.server";
import { getUserById } from "~/core/resources/User/UserController.server";
import AdminLayout from "../core/components/AdminLayout";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);

  if (!userId) {
    return redirect("/login");
  }

  const user = await getUserById({ id: userId });
  // if (!user) there is a cookie but no user in the db
  return json({ user });
}

export type TAdminLoaderData = ReturnType<typeof useLoaderData<typeof loader>>;

export default function Admin() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <AdminLayout user={user}>
      <Outlet />
    </AdminLayout>
  );
}
