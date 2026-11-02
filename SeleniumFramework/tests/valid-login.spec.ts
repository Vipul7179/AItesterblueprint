import { config } from '../config';

describe('Valid login', function () {
  it('authenticates an authorized account with Remember me selected', async function () {
    try {
      await this.loginPage.login(config.email, config.password, true);
      await this.loginPage.assertAuthenticated();
    } catch (cause) {
      throw new Error('Valid login verification failed', { cause });
    }
  });
});
