import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { db } from "~/core/resources/db.server";
import { badRequest } from "~/utils/request.server";
import {
  createUserSession,
  getUserId,
  register,
} from "~/core/resources/Auth/AuthController.server";

export const meta: MetaFunction = () => ({
  description: "Login to submit your own jokes to Remix Jokes!",
  title: "Remix Jokes | Login",
});

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

  const userExists = await db.user.findFirst();
  if (userExists) {
    return badRequest({
      fieldErrors: null,
      fields,
      formError: `User already exists`,
    });
  }
  // create the user
  // create their session and redirect to /jokes
  const user = await register({ email, password });
  if (!user) {
    return badRequest({
      fieldErrors: null,
      fields,
      formError: `Something went wrong trying to create a new user.`,
    });
  }
  return createUserSession(user.id, redirectTo);
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) {
    return redirect("/admin");
  }
  return null;
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  return (
    <div className="container p-8">
      <div className="content p-4 bg-orange-200" data-light="">
        <h1>register</h1>
        <Form method="post">
          <div>
            <label htmlFor="email-input">email</label>
            <input
              type="text"
              id="email-input"
              name="email"
              defaultValue={actionData?.fields?.email}
              aria-invalid={Boolean(actionData?.fieldErrors?.email)}
              aria-errormessage={
                actionData?.fieldErrors?.email ? "email-error" : undefined
              }
            />
            {actionData?.fieldErrors?.email ? (
              <p
                className="form-validation-error"
                role="alert"
                id="email-error"
              >
                {actionData.fieldErrors.email}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="password-input">password</label>
            <input
              id="password-input"
              name="password"
              type="password"
              defaultValue={actionData?.fields?.password}
              aria-invalid={Boolean(actionData?.fieldErrors?.password)}
              aria-errormessage={
                actionData?.fieldErrors?.password ? "password-error" : undefined
              }
            />
            {actionData?.fieldErrors?.password ? (
              <p
                className="form-validation-error"
                role="alert"
                id="password-error"
              >
                {actionData.fieldErrors.password}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="confirm-password-input">confirm password</label>
            <input
              id="confirm-password-input"
              name="confirm-password"
              type="confirm-password"
              defaultValue={actionData?.fields?.confirmPassword}
              aria-invalid={Boolean(actionData?.fieldErrors?.confirmPassword)}
              aria-errormessage={
                actionData?.fieldErrors?.confirmPassword
                  ? "confirm-password-error"
                  : undefined
              }
            />
            {actionData?.fieldErrors?.confirmPassword ? (
              <p
                className="form-validation-error"
                role="alert"
                id="confirm-password-error"
              >
                {actionData.fieldErrors.confirmPassword}
              </p>
            ) : null}
          </div>
          <div id="form-error-message">
            {actionData?.formError ? (
              <p className="form-validation-error" role="alert">
                {actionData.formError}
              </p>
            ) : null}
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
