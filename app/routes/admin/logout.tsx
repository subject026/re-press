import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { logout } from "~/core/resources/Auth/AuthController.server";

export const action = async ({ request }: ActionArgs) => {
  const destroyedSession = await logout(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": destroyedSession,
    },
  });
};

export const loader = async () => {
  return redirect("/login");
};
