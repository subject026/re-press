import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/admin");
});

test("displays login form if not logged in", async ({ page }) => {
  await expect(page.getByText("Bingleboogle")).toBeTruthy();
});

test("can login with email and password", async ({ page }) => {
  // not showing dashboard
  expect(await page.getByText("Admin Index").count()).toBeFalsy();

  await page.getByTestId("email-input").type("steve@example.com");
  await page.getByTestId("password-input").type("password");

  await page.getByTestId("login-button").click();

  await expect(page.getByText("Admin Index")).toBeTruthy();

  const logoutButton = await page.getByTestId("logout-button");

  expect(logoutButton.count()).toBeTruthy();

  await logoutButton.click();

  expect(await page.getByText("Admin Index").count()).toBeFalsy();
});

// test.skip("see error message if login fails", async ({ page }) => {
//   // TESTING: write test here
// });

test.skip("can logout", async ({ page }) => {
  // await expect(page.getByText("Admin Indexyyy").isVisible()).toBeFalsy();
  expect(await page.getByText("other text").count()).toBeFalsy();
  expect(await page.getByText("Admin Index").count()).toBeTruthy();

  const logoutButton = await page.getByTestId("logout-button");

  expect(logoutButton).toBeTruthy();

  // await page.getByTestId("logout-button").click();

  // await expect(page.getByText("logoutnoooo")).toBeTruthy();
});
