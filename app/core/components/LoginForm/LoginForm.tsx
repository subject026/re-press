import { Form } from "@remix-run/react";
import type { TLoginActionData } from "../../../routes/login";

interface IProps {
  actionData: TLoginActionData;
}
export default function LoginForm({ actionData }: IProps) {
  return (
    <Form method="post" data-testid="login-form">
      <div className="form-control">
        <label className="label" htmlFor="email-input">
          Username
        </label>
        <input
          className="input input-primary"
          type="text"
          id="email-input"
          name="email"
          data-testid="email-input"
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
      <div className="form-control">
        <label className="label" htmlFor="password-input">
          Password
        </label>
        <input
          className="input input-primary"
          id="password-input"
          name="password"
          type="password"
          data-testid="password-input"
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
      <div className="form-control pt-8">
        <button
          type="submit"
          data-testid="login-button"
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </Form>
  );
}
