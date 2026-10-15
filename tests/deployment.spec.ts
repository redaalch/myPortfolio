import { test, expect, type Locator } from "@playwright/test";

async function contrastRatio(locator: Locator) {
  return locator.evaluate((element) => {
    const channels = (color: string) => color.match(/[\d.]+/g)!.map(Number);
    const blend = (foreground: number[], background: number[], alpha: number) =>
      foreground.slice(0, 3).map((value, index) => value * alpha + background[index] * (1 - alpha));
    const luminance = (color: number[]) =>
      color
        .map((value) => value / 255)
        .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4))
        .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);

    const ancestors: Element[] = [];
    for (let node: Element | null = element; node; node = node.parentElement)
      ancestors.unshift(node);

    let background = [255, 255, 255];
    let opacity = 1;
    for (const node of ancestors) {
      const style = getComputedStyle(node);
      const color = channels(style.backgroundColor);
      background = blend(color, background, color[3] ?? 1);
      opacity *= Number(style.opacity);
    }
    const foreground = channels(getComputedStyle(element).color);
    const text = blend(foreground, background, (foreground[3] ?? 1) * opacity);
    const a = luminance(text);
    const b = luminance(background);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  });
}

test("deployed app loads assets and navigates within its base path", async ({ page, baseURL }) => {
  const base = new URL(baseURL!);
  if (!base.pathname.endsWith("/")) base.pathname += "/";
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (new URL(response.url()).origin === base.origin && response.status() >= 400) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto(base.href);
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  await expect(navigation).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Reda");
  await expect(page.getByRole("heading", { name: "Featured Projects", exact: true })).toHaveCount(
    0,
  );
  await expect
    .poll(() =>
      page
        .locator('img[src$="hero-2400w.avif"]')
        .evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0),
    )
    .toBe(true);
  await expect(page.getByRole("link", { name: "View CV", exact: true }).first()).toHaveAttribute(
    "href",
    `${base.pathname}Reda_Alalach_Resume.pdf`,
  );

  await navigation.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(new URL("about", base).href);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Reda Alalach");

  await page.goto(new URL("projects/notesboard/", base).href);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("NotesBoard");
  expect(errors).toEqual([]);
});

test("GitHub Pages redirect preserves the base path, query and hash", async ({
  page,
  baseURL,
  request,
}) => {
  const base = new URL(baseURL!);
  if (!base.pathname.endsWith("/")) base.pathname += "/";
  const notFound = await request.get(new URL("404.html", base).href);
  expect(notFound.ok()).toBe(true);
  const html = await notFound.text();
  const destination = new URL("about?from=pages&filter=a%26b#contact", base);
  // Serve the real generated 404 document once, as Pages does for an unknown path.
  await page.route(
    (url) => url.pathname === destination.pathname,
    (route) => route.fulfill({ status: 404, contentType: "text/html", body: html }),
    { times: 1 },
  );
  await page.goto(destination.href);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Reda Alalach");
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  await expect(page).toHaveURL(destination.href);
});

for (const colorScheme of ["light", "dark"] as const) {
  for (const blockStyles of [false, true]) {
    test(`fallback stays readable in ${colorScheme} mode with CSS ${blockStyles ? "unavailable" : "loaded"}`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme });
      await page.route(/\.(?:js|css)(?:\?.*)?$/, (route) => {
        if (route.request().resourceType() === "script" || blockStyles) return route.abort();
        return route.continue();
      });
      await page.goto("./");
      const heading = page.getByRole("heading", { level: 1 });
      await expect(heading).toContainText("Reda Alalach");
      expect(await contrastRatio(heading)).toBeGreaterThanOrEqual(3);
      expect(
        await contrastRatio(page.getByText(/I build reliable Node.js/)),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        await contrastRatio(page.getByRole("link", { name: "NotesBoard", exact: true })),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        await contrastRatio(
          page.getByRole("link", { name: "reda.alalach@gmail.com", exact: true }),
        ),
      ).toBeGreaterThanOrEqual(4.5);
      expect(await contrastRatio(page.getByText(/10\+ concurrent editors/))).toBeGreaterThanOrEqual(
        4.5,
      );
    });
  }
}
