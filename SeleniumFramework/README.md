# Selenium TypeScript login framework

Real Chrome automation of https://app.wingify.com/#/login using Selenium WebDriver, Mocha, TypeScript and DOM Testing Library semantic queries. Application locators use roles, accessible labels and visible text. The adapter injects the local DOM Testing Library bundle using WebDriver; it does not use Playwright. Password inputs are located by label because they have no implicit textbox role.

## Run

Requires Node.js 24 or newer, Chrome, and network access to Wingify and Selenium Manager driver downloads. An optional CHROME_BINARY or CHROMEDRIVER_PATH can select local executables.

```powershell
npm.cmd ci
npm.cmd run typecheck
npm.cmd test
npm.cmd run test:headed
npm.cmd run test:invalid
npm.cmd run test:valid
```

Two scripts cover real valid and invalid credential submissions. Each runnable test gets a fresh browser through beforeEach and quits through afterEach, including failures. There are no retries, fixed sleeps, mocked login responses or fabricated successful credentials. Headed mode opens a visible Chrome window and closes it after verification.

## Configuration

Copy .env.example to .env, or set environment variables locally. Keep credentials out of source control and chat. VWO_EMAIL and VWO_PASSWORD are required for valid authentication. VWO_SUCCESS_URL and VWO_SUCCESS_HEADING must identify the actual authorized landing URL and visible heading; no dashboard destination is assumed. The valid test is explicitly skipped if any of these four settings is missing.

VWO_REJECTION_MESSAGE optionally overrides the rejection text observed during live verification: “Your email, password, IP address or location did not match”. TEST_TIMEOUT_MS controls explicit waits and page loading. VWO_BASE_URL optionally overrides the login endpoint. .env is ignored by Git. Environment variables take precedence over .env.

The PRD is unavailable. Scope is limited to the explicitly requested email, password, Sign in, Remember me and valid/invalid authentication. Successful login verifies both the configured URL and authenticated heading. Invalid login verifies the observed rejection text, login URL and available login controls. Remember me selection is verified; persistence across browser sessions is outside the provided requirements.

## Reports

The custom Mocha reporter writes index.html and results.json under reports/headless or reports/headed. Skips include reasons; failures include nested exception causes and a best-effort screenshot with input values cleared. Reports can contain account information rendered elsewhere on the page and should stay local. REPORT_DIR overrides the destination. Test failures retain a nonzero process exit status.

## References

- [Selenium JavaScript API](https://www.selenium.dev/selenium/docs/api/javascript/)
- [DOM Testing Library role queries](https://testing-library.com/docs/queries/byrole/)
