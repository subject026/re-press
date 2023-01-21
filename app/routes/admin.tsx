import { redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import type { useLoaderData } from "@remix-run/react";
import { getUserId } from "~/core/resources/Auth/AuthController.server";
import { getUserById } from "~/core/resources/User/UserController.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) {
    const user = await getUserById({ id: userId });
    return json({ user });
  }

  return redirect("/login");
}

export type TAdminLoaderData = ReturnType<typeof useLoaderData<typeof loader>>;

export default function Admin() {
  return <Outlet />;
}
