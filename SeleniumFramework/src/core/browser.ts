import { Builder, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { config } from '../../config';

export async function createBrowser(): Promise<WebDriver> {
  let driver: WebDriver | undefined;
  try {
    const options = new chrome.Options();
    options.addArguments('--window-size=1440,1000');
    if (config.headless) options.addArguments('--headless=new');
    if (process.env.CHROME_BINARY) options.setBinaryPath(process.env.CHROME_BINARY);
    let builder = new Builder().forBrowser('chrome').setChromeOptions(options);
    if (process.env.CHROMEDRIVER_PATH) builder = builder.setChromeService(new chrome.ServiceBuilder(process.env.CHROMEDRIVER_PATH));
    driver = await builder.build();
    await driver.manage().setTimeouts({ implicit: 0, pageLoad: config.timeout, script: config.timeout });
    return driver;
  } catch (cause) {
    if (driver) await driver.quit().catch(() => undefined);
    throw new Error('Chrome session setup failed', { cause });
  }
}
