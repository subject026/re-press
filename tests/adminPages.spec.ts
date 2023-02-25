import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/admin");
});

test("navigate to pages route", async ({ page }) => {
  await page.getByTestId("email-input").type("steve@example.com");
  await page.getByTestId("password-input").type("password");

  await page.getByTestId("login-button").click();

  await page.getByText("pages").click();

  // back to login page
  await expect(page.locator("body")).toContainText(/Pages/);

  // render list of current pages

  // add page

  // view page

  // edit page

  // delete page
});
