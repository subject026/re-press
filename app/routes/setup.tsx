import { redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import InitForm from "~/core/components/InitForm";
import { getUserByEmail } from "../core/resources/User/UserController.server";
import { badRequest } from "../utils/request.server";
import * as Auth from "~/core/resources/Auth/AuthController.server";
import { useActionData } from "@remix-run/react";

function validateUsername(email: unknown) {
  if (typeof email !== "string" || email.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

function validateUrl(url: string) {
  let urls = ["/admin", "/", "https://remix.run"];
  if (urls.includes(url)) {
    return url;
  }
  return "/admin";
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();

  const loginType = form.get("loginType");
  const email = form.get("email");
  const password = form.get("password");
  const confirmPassword = form.get("confirmPassword");

  const redirectTo = validateUrl("/admin");

  if (
    typeof loginType !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { email, password, confirmPassword };
  const fieldErrors = {
    email: validateUsername(email),
    password: validatePassword(password),
    confirmPassword:
      confirmPassword === password ? undefined : "Passwords do not match",
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const userExists = await getUserByEmail(email, { id: true });
  if (userExists) {
    return badRequest({
      fieldErrors: null,
      fields,
      formError: `User already exists`,
    });
  }
  // create the user
  // create their session and redirect to /jokes
  const user = await Auth.register({ email, password });
  if (!user) {
    return badRequest({
      fieldErrors: null,
      fields,
      formError: `Something went wrong trying to create a new user.`,
    });
  }
  return Auth.createUserSession(user.id, redirectTo);
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await Auth.getUserId(request);
  if (userId) {
    return redirect("/admin");
  }
  return null;
};

export default function SetupRoute() {
  const actionData = useActionData<typeof action>();
  return <InitForm actionData={actionData} />;
}
export type TSetupActionData = ReturnType<typeof useActionData<typeof action>>;
