import { config } from '../config';

describe('Invalid login', function () {
  it('rejects invalid credentials and remains on the login page', async function () {
    try {
      await this.loginPage.setRememberMe(true);
      await this.loginPage.setRememberMe(false);
      await this.loginPage.login(config.invalidEmail, config.invalidPassword, false);
      await this.loginPage.assertRejected();
    } catch (cause) {
      throw new Error('Invalid login verification failed', { cause });
    }
  });
});
