import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/admin");
});

test("displays login form if not logged in", async ({ page }) => {
  expect(await page.getByText("Login").count()).toBeTruthy();
});

test("can login with email and password", async ({ page }) => {
  // not showing dashboard
  await expect(page.locator("body")).toContainText(/Login/);

  await page.getByTestId("email-input").type("steve@example.com");
  await page.getByTestId("password-input").type("password");

  await page.getByTestId("login-button").click();

  await expect(page.locator("body")).toContainText(/steve@example.com/);
  await expect(page.locator("body")).not.toContainText(/Login/);

  await page.getByTestId("logout-button").click();

  // back to login page
  await expect(page.locator("body")).toContainText(/Login/);
  await expect(page.locator("body")).not.toContainText(/steve@example.com/);
});
