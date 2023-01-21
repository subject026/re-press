import { Form } from "@remix-run/react";
import type { TSetupActionData } from "../../../routes/setup";

interface IProps {
  actionData: TSetupActionData;
}

export default function InitForm({ actionData }: IProps) {
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
              defaultValue={""}
              // aria-invalid={Boolean(actionData?.fieldErrors?.confirmPassword)}
              // aria-errormessage={
              //   actionData?.fieldErrors?.confirmPassword
              //     ? "confirm-password-error"
              //     : undefined
              // }
            />
            {/* {actionData?.fieldErrors?.confirmPassword ? (
              <p
                className="form-validation-error"
                role="alert"
                id="confirm-password-error"
              >
                {actionData.fieldErrors.confirmPassword}
              </p>
            ) : null} */}
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
