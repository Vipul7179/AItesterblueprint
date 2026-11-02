# Enterprise Playwright TypeScript Automation Framework

## Overview
This enterprise-grade automation framework is built with Playwright and TypeScript for testing the Wingify VWO authentication platform (`https://app.wingify.com/#/login`). It strictly implements the Page Object Model (POM) architectural design pattern, uses semantic accessibility-first Playwright locators, and incorporates custom reporting engine capabilities.

---

## Key Framework Features
- **Page Object Model (POM)**: Complete separation between test assertions and page mechanics.
- **Accessibility-First Locators**: Exclusively uses semantic locators (`getByRole`, `getByLabel`, `getByText`) with zero reliance on brittle CSS selectors, IDs, names, or XPath.
- **Robust Exception Handling**: Structured `try-catch` blocks with explicit exception diagnostics across page objects and test suites.
- **Lifecycle Management**: Built-in `@BeforeEach` and `@AfterEach` lifecycle hooks for deterministic test state isolation.
- **Custom Test Engine Reporter**: Dedicated test engine reporter (`src/reporters/CustomReporter.ts`) providing real-time console summaries and execution diagnostics.
- **Cross-Mode Execution**: Full support for headless CI pipelines and headed desktop interactive test executions.

---

## Directory Structure
```
PlaywrightFramework/
├── config.ts                         # Central configuration parameters
├── package.json                      # NPM dependencies and execution scripts
├── playwright.config.ts              # Playwright test engine configuration
├── tsconfig.json                     # TypeScript compiler options
├── README.md                         # Framework documentation
├── src/
│   ├── pages/
│   │   └── LoginPage.ts              # Enterprise Page Object Model for Login
│   └── reporters/
│       └── CustomReporter.ts         # Custom Test Engine Reporter
└── tests/
    ├── valid-login.spec.ts           # Test script 1: Valid authentication scenario
    └── invalid-login.spec.ts         # Test script 2: Invalid authentication scenario
```

---

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Install Playwright Browsers**:
   ```bash
   npx playwright install chromium
   ```

---

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

---

## Locator Strategy
| Element | Semantic Playwright Locator |
|---|---|
| Email Input | `page.getByRole('textbox', { name: 'Email address' })` |
| Password Input | `page.getByRole('textbox', { name: 'Password' })` |
| Remember Me | `page.getByLabel('Remember me')` |
| Sign In Button | `page.getByRole('button', { name: 'Sign in', exact: true })` |
| Error Message | `page.getByText('Your email, password, IP address or location did not match')` |

