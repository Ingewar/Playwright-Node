// @ts-check
import { expect, test } from "@playwright/test";

const authFile = 'playwright/.auth/user.json';
const BASE_URL = process.env.BASE_URL as string
const EMAIL = process.env.EMAIL as string
const PASSWORD = process.env.PASSWORD as string

test.describe('Home page & Login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    })

    test('open home page', async ({ page }) => {
        await expect(page).toHaveTitle(/DEV Community/)
    })

    test('open login modal', async ({ page }) => {
        await page.locator('#authentication-top-nav-actions').getByRole('link', { name: 'Log in' }).click()
        await expect(page.locator('div').filter({ hasText: /Welcome to DEV Community/ }).nth(2)).toBeVisible()
    })

    test('login by email', async ({ page }) => {
        await page.locator('#authentication-top-nav-actions').getByRole('link', { name: 'Log in' }).click()
        await page.getByLabel('Email').fill(EMAIL)
        await page.getByLabel('Password').fill(PASSWORD)
        await page.getByTestId('login-form').getByRole('button', { name: 'Continue' }).click()
        expect(page.url()).toContain('signin=true')
    })
})

test.describe('Settings page', () => {
    test.use({ storageState: authFile })

    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    })

    test('Open settings page', async ({ page }) => {
        await page.getByRole('button', { name: 'Navigation menu' }).click()
        await page.getByRole('link', { name: 'Settings' }).click()
        await expect(page.getByRole('heading', { name: 'Settings for @ihor_kovtun_ab0efded5ee65' })).toBeVisible();
    })
})