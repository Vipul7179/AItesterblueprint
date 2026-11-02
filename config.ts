export const config = {
  baseUrl: 'https://app.wingify.com/#/login',
  dashboardUrl: 'https://app.wingify.com/#/dashboard',
  timeout: 30000,
  credentials: {
    valid: {
      email: 'enterprise_user@wingify.com',
      password: 'ValidEnterprisePassword2026!'
    },
    invalid: {
      email: 'invalid_qa_user@wingify.com',
      password: 'InvalidPassword123!'
    }
  },
  expectedMessages: {
    invalidCredentials: 'Your email, password, IP address or location did not match'
  }
};

