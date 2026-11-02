import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { config } from '../config';

test.describe('VWO Platform - Valid Authentication Suite', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    try {
      await page.route('**/login*', async route => {
        if (route.request().method() === 'POST') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              status: 302,
              location: config.dashboardUrl
            })
          });
        } else {
          await route.continue();
        }
      });

      loginPage = new LoginPage(page);
      await loginPage.navigate();
    } catch (error) {
      throw new Error(`Test setup failed in beforeEach hook: ${(error as Error).message}`);
    }
  });

  test.afterEach(async ({ page }) => {
    try {
      await page.unrouteAll({ behavior: 'ignoreErrors' });
    } catch (error) {
      throw new Error(`Test teardown failed in afterEach hook: ${(error as Error).message}`);
    }
  });

  test('Verify successful login with valid credentials and remember me option', async ({ page }) => {
    try {
      await expect(loginPage.signInButton).toBeVisible();
      await expect(loginPage.emailInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();

      await loginPage.login(
        config.credentials.valid.email,
        config.credentials.valid.password,
        true
      );

      await page.waitForURL('**/dashboard', { timeout: 15000 });
      expect(page.url()).toContain('#/dashboard');
    } catch (error) {
      throw new Error(`Valid login verification test failed: ${(error as Error).message}`);
    }
  });
});

