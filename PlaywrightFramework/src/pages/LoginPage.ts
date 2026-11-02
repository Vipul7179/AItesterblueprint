import { Page, Locator, expect } from '@playwright/test';
import { config } from '../../config';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    try {
      this.page = page;
      this.emailInput = page.getByRole('textbox', { name: 'Email address' });
      this.passwordInput = page.getByRole('textbox', { name: 'Password' });
      this.rememberMeCheckbox = page.getByText('Remember me');
      this.signInButton = page.getByRole('button', { name: 'Sign in', exact: true });
      this.errorMessage = page.getByText(config.expectedMessages.invalidCredentials);
    } catch (error) {
      throw new Error(`Failed to initialize LoginPage: ${(error as Error).message}`);
    }
  }

  async navigate(): Promise<void> {
    try {
      await this.page.goto(config.baseUrl, { waitUntil: 'domcontentloaded' });
      await expect(this.signInButton).toBeVisible({ timeout: 15000 });
    } catch (error) {
      throw new Error(`Navigation to login page failed: ${(error as Error).message}`);
    }
  }

  async enterEmail(email: string): Promise<void> {
    try {
      await expect(this.emailInput).toBeVisible();
      await this.emailInput.fill(email);
    } catch (error) {
      throw new Error(`Failed to enter email: ${(error as Error).message}`);
    }
  }

  async enterPassword(password: string): Promise<void> {
    try {
      await expect(this.passwordInput).toBeVisible();
      await this.passwordInput.fill(password);
    } catch (error) {
      throw new Error(`Failed to enter password: ${(error as Error).message}`);
    }
  }

  async selectRememberMe(): Promise<void> {
    try {
      await expect(this.rememberMeCheckbox).toBeVisible();
      await this.rememberMeCheckbox.click();
    } catch (error) {
      throw new Error(`Failed to select remember me checkbox: ${(error as Error).message}`);
    }
  }

  async clickSignIn(): Promise<void> {
    try {
      await expect(this.signInButton).toBeEnabled();
      await this.signInButton.click();
    } catch (error) {
      throw new Error(`Failed to click sign in button: ${(error as Error).message}`);
    }
  }

  async login(email: string, password: string, rememberMe = false): Promise<void> {
    try {
      await this.enterEmail(email);
      await this.enterPassword(password);
      if (rememberMe) {
        await this.selectRememberMe();
      }
      await this.clickSignIn();
    } catch (error) {
      throw new Error(`Login action sequence failed: ${(error as Error).message}`);
    }
  }

  async getErrorMessage(): Promise<string> {
    try {
      await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
      const text = await this.errorMessage.textContent();
      return text ? text.trim() : '';
    } catch (error) {
      throw new Error(`Failed to retrieve error message: ${(error as Error).message}`);
    }
  }

  async isErrorMessageVisible(): Promise<boolean> {
    try {
      return await this.errorMessage.isVisible();
    } catch (error) {
      throw new Error(`Failed to check error message visibility: ${(error as Error).message}`);
    }
  }

  async isEmailInputVisible(): Promise<boolean> {
    try {
      return await this.emailInput.isVisible();
    } catch (error) {
      throw new Error(`Failed to verify email input visibility: ${(error as Error).message}`);
    }
  }

  async isPasswordInputVisible(): Promise<boolean> {
    try {
      return await this.passwordInput.isVisible();
    } catch (error) {
      throw new Error(`Failed to verify password input visibility: ${(error as Error).message}`);
    }
  }

  async isSignInButtonVisible(): Promise<boolean> {
    try {
      return await this.signInButton.isVisible();
    } catch (error) {
      throw new Error(`Failed to verify sign in button visibility: ${(error as Error).message}`);
    }
  }
}