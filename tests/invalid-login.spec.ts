import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { config } from '../config';

test.describe('VWO Platform - Invalid Authentication Suite', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    try {
      loginPage = new LoginPage(page);
      await loginPage.navigate();
    } catch (error) {
      throw new Error(`Test setup failed in beforeEach hook: ${(error as Error).message}`);
    }
  });

  test.afterEach(async ({ page }) => {
    try {
      await page.close();
    } catch (error) {
      throw new Error(`Test teardown failed in afterEach hook: ${(error as Error).message}`);
    }
  });

  test('Verify error notification is displayed when authenticating with invalid credentials', async ({ page }) => {
    try {
      await expect(loginPage.signInButton).toBeVisible();

      await loginPage.login(
        config.credentials.invalid.email,
        config.credentials.invalid.password,
        false
      );

      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toBe(config.expectedMessages.invalidCredentials);
      expect(await loginPage.isErrorMessageVisible()).toBe(true);
      expect(page.url()).toContain('#/login');
    } catch (error) {
      throw new Error(`Invalid login verification test failed: ${(error as Error).message}`);
    }
  });
});

