import { Form } from "@remix-run/react";
import type { TLoginActionData } from "../../../routes/login";

interface IProps {
  actionData: TLoginActionData;
}
export default function LoginForm({ actionData }: IProps) {
  return (
    <Form method="post">
      <div>
        <label htmlFor="email-input">Username</label>
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
          <p className="form-validation-error" role="alert" id="email-error">
            {actionData.fieldErrors.email}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="password-input">Password</label>
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
          <p className="form-validation-error" role="alert" id="password-error">
            {actionData.fieldErrors.password}
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
  );
}
