import { useRouteLoaderData } from "@remix-run/react";

import type { TAdminLoaderData } from "../admin";

export default function AdminIndex() {
  const { user } = useRouteLoaderData("routes/admin") as TAdminLoaderData;
  return <h2>Admin Index</h2>;
}
