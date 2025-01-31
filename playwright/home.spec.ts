/* eslint-disable quotes */
import { expect, test } from "@playwright/test"

test.describe("Home page", () => {
  test("should shorten a URL successfully", async ({ page }) => {
    await page.goto("/")
    await page.fill('input[name="url"]', "https://yahoo.com") // Please change this URL for each test
    await page.click('button:has-text("Shorten")')
    await page.waitForTimeout(3000)
    await page.waitForSelector("table tbody tr")
    const rowText = await page.textContent(
      "table tbody tr td:nth-child(2) span"
    )
    expect(rowText).toContain("yahoo.com") // Please change this URL for each test
  })

  test("should navigate through pagination", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("text=Page 1 of")).toBeVisible()
    await page.click('button:has-text("Next")')
    await expect(page.locator("text=Page 2 of")).toBeVisible()
    await page.click('button:has-text("Previous")')
    await expect(page.locator("text=Page 1 of")).toBeVisible()
  })
})
