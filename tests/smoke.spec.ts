import { test, expect } from "@playwright/test";

test.describe("Smoke tests — key pages render", () => {
  test("homepage loads and shows hero heading", async ({ page }) => {
    await page.goto("/");
    // The loading screen should eventually disappear and the hero should be visible
    const heading = page.locator("h1");
    await expect(heading).toBeVisible({ timeout: 10_000 });
    await expect(heading).toContainText("Reda");
  });

  test("homepage has projects section", async ({ page }) => {
    await page.goto("/");
    const projects = page.locator("#projects");
    await expect(projects).toBeVisible({ timeout: 10_000 });
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("h1")).toContainText("Reda Alalach", { timeout: 10_000 });
  });

  test("case study page loads (notesboard)", async ({ page }) => {
    await page.goto("/case-study/notesboard");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("h1")).toContainText("NotesBoard");
  });

  test("unknown route redirects to home", async ({ page }) => {
    await page.goto("/nonexistent-page");
    // Should redirect to / via the catch-all route
    await expect(page).toHaveURL("/", { timeout: 10_000 });
  });
});

test.describe("Deep link routes — static pages serve correctly", () => {
  test("project detail page loads via direct URL (/projects/notesboard)", async ({ page }) => {
    await page.goto("/projects/notesboard");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("h1")).toContainText("NotesBoard");
  });

  test("project detail page loads via direct URL (/projects/real-time-notifications)", async ({
    page,
  }) => {
    await page.goto("/projects/real-time-notifications");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("h1")).toContainText("Real-time Notifications");
  });

  test("case study page loads via direct URL (/case-study/real-time-notifications)", async ({
    page,
  }) => {
    await page.goto("/case-study/real-time-notifications");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("h1")).toContainText("Real-Time Notifications");
  });

  test("case study page loads via direct URL (/case-study/portfolio-site)", async ({ page }) => {
    await page.goto("/case-study/portfolio-site");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("h1")).toContainText("Portfolio");
  });

  test("projects listing page loads (/projects)", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.locator("h1, h2").first()).toBeVisible({ timeout: 10_000 });
  });

  test("CV page loads (/cv)", async ({ page }) => {
    await page.goto("/cv");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("h1")).toContainText("Reda Alalach");
  });

  test("non-existent project slug redirects to home", async ({ page }) => {
    await page.goto("/projects/does-not-exist");
    await expect(page).toHaveURL("/", { timeout: 10_000 });
  });

  test("non-existent case study slug redirects to home", async ({ page }) => {
    await page.goto("/case-study/does-not-exist");
    await expect(page).toHaveURL("/", { timeout: 10_000 });
  });
});

test.describe("Navigation", () => {
  test("can navigate from home to about via nav link", async ({ page }) => {
    await page.goto("/");
    // Wait for the page to load
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    // Click About link in the nav
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL("/about", { timeout: 10_000 });
    await expect(page.locator("h1")).toContainText("Reda Alalach");
  });
});
