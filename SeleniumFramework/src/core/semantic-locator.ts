import { readFileSync } from 'node:fs';
import { WebDriver, WebElement, error } from 'selenium-webdriver';
import { config } from '../../config';

const library = readFileSync(require.resolve('@testing-library/dom/dist/@testing-library/dom.umd.js'), 'utf8');
type Query = 'Role' | 'LabelText' | 'Text';

export class SemanticLocator {
  constructor(private readonly driver: WebDriver, private readonly query: Query, private readonly value: string, private readonly options: Record<string, unknown> = {}, private readonly requireVisible = true) {}

  async element(): Promise<WebElement> {
    const result = await this.driver.wait(async () => {
      try {
        await this.driver.executeScript(`${library}\nwindow.__seleniumQueries = window.TestingLibraryDom;`);
        const elements = await this.driver.executeScript<WebElement[]>(
          'return window.__seleniumQueries["queryAllBy" + arguments[0]](document.body, arguments[1], arguments[2]);',
          this.query, this.value, { exact: true, ...this.options }
        );
        const visible: WebElement[] = [];
        for (const element of elements) if (!this.requireVisible || await element.isDisplayed()) visible.push(element);
        if (visible.length > 1) throw new Error(`Ambiguous visible semantic locator: ${this.query} ${this.value}`);
        return visible[0] ?? false;
      } catch (cause) {
        if (cause instanceof error.StaleElementReferenceError) return false;
        throw cause;
      }
    }, config.timeout, `Visible semantic locator missing: ${this.query} ${this.value}`);
    if (!result) throw new Error(`Missing semantic element: ${this.value}`);
    return result;
  }

  async fill(value: string): Promise<void> {
    try {
      const element = await this.element();
      await this.driver.wait(() => element.isEnabled(), config.timeout);
      await element.clear();
      await element.sendKeys(value);
    } catch (cause) {
      throw new Error(`Unable to fill ${this.query} ${this.value}`, { cause });
    }
  }

  async click(): Promise<void> {
    try {
      const element = await this.element();
      await this.driver.wait(() => element.isEnabled(), config.timeout);
      await element.click();
    } catch (cause) {
      throw new Error(`Unable to click ${this.query} ${this.value}`, { cause });
    }
  }
}

export class SemanticPage {
  constructor(private readonly driver: WebDriver) {}
  getByRole(role: string, options: { name: string }): SemanticLocator { return new SemanticLocator(this.driver, 'Role', role, options); }
  getByLabel(label: string, options: { visible?: boolean } = {}): SemanticLocator { return new SemanticLocator(this.driver, 'LabelText', label, {}, options.visible !== false); }
  getByText(text: string): SemanticLocator { return new SemanticLocator(this.driver, 'Text', text); }
}
