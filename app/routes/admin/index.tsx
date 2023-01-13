import { json, redirect } from "@remix-run/node";
import AdminLayout from "../../modules/admin/components/AdminLayout";

export const loader = async () => {
  const user = true;
  if (!user) {
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
