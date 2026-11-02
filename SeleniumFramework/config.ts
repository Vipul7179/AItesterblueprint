import 'dotenv/config';

const timeout = Number(process.env.TEST_TIMEOUT_MS ?? 30000);
if (!Number.isFinite(timeout) || timeout < 1000) throw new Error('TEST_TIMEOUT_MS must be at least 1000');

export const config = Object.freeze({
  baseUrl: process.env.VWO_BASE_URL ?? 'https://app.wingify.com/#/login',
  timeout,
  headless: process.env.HEADED !== 'true',
  email: process.env.VWO_EMAIL ?? '',
  password: process.env.VWO_PASSWORD ?? '',
  successUrl: process.env.VWO_SUCCESS_URL ?? '',
  successHeading: process.env.VWO_SUCCESS_HEADING ?? '',
  invalidEmail: 'selenium-login-test@example.invalid',
  invalidPassword: 'DeliberatelyInvalid-2026!',
  rejectionMessage: process.env.VWO_REJECTION_MESSAGE || 'Your email, password, IP address or location did not match',
  reportDir: process.env.REPORT_DIR ?? 'reports/latest'
});

export function redact(value: string): string {
  return [config.email, config.password, config.invalidPassword]
    .filter(Boolean).reduce((text, secret) => text.split(secret).join('[REDACTED]'), value);
}
