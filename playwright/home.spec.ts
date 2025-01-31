/* eslint-disable quotes */
import { expect, test } from "@playwright/test"

test.describe("Home page", () => {
  test("should shorten a URL successfully", async ({ page }) => {
    const url = `https://${Math.random().toString(36).substring(7)}.com`
    await page.goto("/")
    await page.fill('input[name="url"]', url)
    const shortenButton = page.locator('button:has-text("Shorten")')
    await expect(shortenButton).toBeEnabled()
    await shortenButton.click()
    await page.waitForTimeout(3000)
    const rowText = await page.textContent(
      "table tbody tr td:nth-child(2) span"
    )
    expect(rowText).toContain(url)
  })

  test("should navigate through pagination", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("text=Page 1 of")).toBeVisible()
    await page.click('button:has-text("Next")')
    await expect(page.locator("text=Page 2 of")).toBeVisible()
    await page.click('button:has-text("Previous")')
    await expect(page.locator("text=Page 1 of")).toBeVisible()
  })

  test("should show an error message when shortening a URL fails", async ({
    page,
  }) => {
    await page.goto("/")
    await page.fill('input[name="url"]', "ftp://invalid-url")
    await page.click('button:has-text("Shorten")')
    await page.waitForSelector("text=Invalid HTTP/HTTPS URL")
    const toastMessage = page.locator("text=Invalid HTTP/HTTPS URL")
    await expect(toastMessage).toBeVisible()
  })
})
