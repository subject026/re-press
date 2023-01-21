import { redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

import { badRequest } from "~/utils/request.server";
import {
  createUserSession,
  getUserId,
  login,
} from "~/core/resources/Auth/AuthController.server";
// import InitForm from "../core/components/InitForm";
import LoginForm from "../core/components/LoginForm/LoginForm";

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

// function validateUrl(url: string) {
//   let urls = ["/admin", "/", "https://remix.run"];
//   if (urls.includes(url)) {
//     return url;
//   }
//   return "/admin";
// }

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const email = form.get("email");
  const password = form.get("password");

  // const redirectTo = validateUrl("/admin");

  console.log(email, password);

  if (typeof email !== "string" || typeof password !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { loginType, email, password };
  const fieldErrors = {
    email: validateUsername(email),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  // login to get the user
  const user = await login({ email, password });
  console.log({ user });
  // if there's no user, return the fields and a formError
  if (!user) {
    return badRequest({
      fieldErrors: null,
      fields,
      formError: `email/Password combination is incorrect`,
    });
  }
  return createUserSession(user.id, "/admin");
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) {
    return redirect("/admin");
  }
  return null;
};

export type TLoginActionData = ReturnType<typeof useActionData<typeof action>>;

export default function LoginRoute() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="container p-8">
      <div className="content p-4 bg-orange-200" data-light="">
        <h1>Login</h1>
        <LoginForm actionData={actionData} />
      </div>
    </div>
  );
}
