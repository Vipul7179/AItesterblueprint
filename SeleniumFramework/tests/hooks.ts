import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { WebDriver } from 'selenium-webdriver';
import { config, redact } from '../config';
import { createBrowser } from '../src/core/browser';
import { LoginPage } from '../src/pages/LoginPage';

declare module 'mocha' {
  interface Context {
    driver?: WebDriver;
    loginPage: LoginPage;
  }
}

export const mochaHooks: Mocha.RootHookObject = {
  async beforeEach(this: Mocha.Context) {
    const valid = this.currentTest?.file?.endsWith('valid-login.spec.ts') && !this.currentTest.file.endsWith('invalid-login.spec.ts');
    if (valid && (!config.email || !config.password || !config.successUrl || !config.successHeading)) {
      (this.currentTest as Mocha.Test & { skipReason?: string }).skipReason = 'Set VWO_EMAIL, VWO_PASSWORD, VWO_SUCCESS_URL and VWO_SUCCESS_HEADING for real authentication verification';
      this.skip();
    }
    try {
      this.driver = await createBrowser();
      this.loginPage = new LoginPage(this.driver);
      await this.loginPage.open();
    } catch (cause) {
      throw new Error('BeforeEach failed', { cause });
    }
  },
  async afterEach(this: Mocha.Context) {
    try {
      if (this.currentTest?.state === 'failed' && this.driver) {
        try {
          await this.driver.executeScript('for (const element of document.getElementsByTagName("input")) element.value = "";');
          const file = `${this.currentTest.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.png`;
          await mkdir(config.reportDir, { recursive: true });
          await writeFile(path.join(config.reportDir, file), await this.driver.takeScreenshot(), 'base64');
          (this.currentTest as Mocha.Test & { screenshot?: string }).screenshot = file;
        } catch (cause) {
          console.error(redact(`Failure screenshot unavailable: ${String(cause)}`));
        }
      }
    } finally {
      const driver = this.driver;
      this.driver = undefined;
      if (driver) {
        try { await driver.quit(); }
        catch (cause) { throw new Error('AfterEach browser cleanup failed', { cause }); }
      }
    }
  }
};
