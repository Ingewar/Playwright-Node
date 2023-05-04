import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
const BASE_URL = process.env.BASE_URL as string
const EMAIL = process.env.EMAIL as string
const PASSWORD = process.env.PASSWORD as string

setup('authenticate', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#authentication-top-nav-actions').getByRole('link', { name: 'Log in' }).click()
    await page.getByLabel('Email').fill(EMAIL)
    await page.getByLabel('Password').fill(PASSWORD)
    await page.getByTestId('login-form').getByRole('button', { name: 'Continue' }).click()
    expect(page.url()).toContain('signin=true')

    // Store authenticated state 
    await page.context().storageState({ path: authFile });
})