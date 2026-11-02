import assert from 'node:assert/strict';
import { WebDriver } from 'selenium-webdriver';
import { config } from '../../config';
import { SemanticPage } from '../core/semantic-locator';

export class LoginPage {
  readonly page: SemanticPage;
  readonly email;
  readonly password;
  readonly rememberMe;
  readonly signIn;

  constructor(private readonly driver: WebDriver) {
    this.page = new SemanticPage(driver);
    this.email = this.page.getByLabel('Email address');
    this.password = this.page.getByLabel('Password');
    this.rememberMe = this.page.getByLabel('Remember me', { visible: false });
    this.signIn = this.page.getByRole('button', { name: 'Sign in' });
  }

  async open(): Promise<void> {
    try {
      await this.driver.get(config.baseUrl);
      await this.assertReady();
    } catch (cause) {
      throw new Error('Login page setup failed', { cause });
    }
  }

  async assertReady(): Promise<void> {
    await this.email.element();
    assert.equal(await (await this.password.element()).getAttribute('type'), 'password');
    await this.rememberMe.element();
    await this.page.getByText('Remember me').element();
    assert.equal(await (await this.signIn.element()).isEnabled(), true);
  }

  async login(email: string, password: string, remember: boolean): Promise<void> {
    try {
      await this.email.fill(email);
      await this.password.fill(password);
      await this.setRememberMe(remember);
      await this.signIn.click();
    } catch (cause) {
      throw new Error('Login submission failed', { cause });
    }
  }

  async setRememberMe(selected: boolean): Promise<void> {
    try {
      const checkbox = await this.rememberMe.element();
      if (await checkbox.isSelected() !== selected) await this.page.getByText('Remember me').click();
      assert.equal(await checkbox.isSelected(), selected);
    } catch (cause) {
      throw new Error('Remember me selection failed', { cause });
    }
  }

  async assertRejected(): Promise<void> {
    if (!config.rejectionMessage) throw new Error('VWO_REJECTION_MESSAGE must contain the observed rejection message');
    await this.page.getByText(config.rejectionMessage).element();
    assert.equal(new URL(await this.driver.getCurrentUrl()).hash, new URL(config.baseUrl).hash);
    await this.assertReady();
  }

  async assertAuthenticated(): Promise<void> {
    if (!config.successUrl || !config.successHeading) throw new Error('VWO_SUCCESS_URL and VWO_SUCCESS_HEADING are required to verify the authenticated page');
    await this.driver.wait(async () => await this.driver.getCurrentUrl() === config.successUrl, config.timeout, 'Expected authenticated URL was not reached');
    await this.page.getByRole('heading', { name: config.successHeading }).element();
  }
}
