# Enterprise Playwright TypeScript Automation Framework

## Overview

This enterprise-grade automation framework is built with Playwright and TypeScript for testing the Wingify VWO authentication platform (`https://app.wingify.com/#/login`). It implements the Page Object Model (POM), semantic accessibility-first Playwright locators, and custom reporting capabilities.

## Key Framework Features

- **Page Object Model (POM):** Separation between test assertions and page mechanics.
- **Accessibility-First Locators:** Uses semantic locators (`getByRole`, `getByLabel`, `getByText`).
- **Exception Handling:** Structured error handling and diagnostics.
- **Lifecycle Management:** Test setup and teardown hooks.
- **Custom Reporter:** Dedicated reporter at `src/reporters/CustomReporter.ts`.
- **Cross-Mode Execution:** Supports headless and headed test execution.

## Directory Structure

```text
PlaywrightFramework/
├── config.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── README.md
├── src/
│   ├── pages/
│   │   └── LoginPage.ts
│   └── reporters/
│       └── CustomReporter.ts
└── tests/
    ├── valid-login.spec.ts
    └── invalid-login.spec.ts
```

## Installation & Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install Playwright Chromium:

   ```bash
   npx playwright install chromium
   ```

## Test Execution Commands

### Run All Tests (Headless)

```bash
npm run test
```

### Run All Tests (Headed Mode)

```bash
npm run test:headed
```

### Run Valid Login Test (Headless)

```bash
npm run test:valid
```

### Run Valid Login Test (Headed Mode)

```bash
npm run test:valid:headed
```

### Run Invalid Login Test (Headless)

```bash
npm run test:invalid
```

### Run Invalid Login Test (Headed Mode)

```bash
npm run test:invalid:headed
```

### View HTML Test Report

```bash
npm run test:report
```

## Locator Strategy

| Element | Semantic Playwright Locator |
|---|---|
| Email Input | `page.getByRole('textbox', { name: 'Email address' })` |
| Password Input | `page.getByRole('textbox', { name: 'Password' })` |
| Remember Me | `page.getByLabel('Remember me')` |
| Sign In Button | `page.getByRole('button', { name: 'Sign in', exact: true })` |
| Error Message | `page.getByText('Your email, password, IP address or location did not match')` |
