import { json, redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import AdminLayout from "../../modules/admin/components/AdminLayout";
import { getUserId } from "../../utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("login");
  }

  return json({ this: "is json" });
};

export default function AdminIndex() {
  return (
    <AdminLayout>
      <h2>Admin Index</h2>
    </AdminLayout>
  );
}
