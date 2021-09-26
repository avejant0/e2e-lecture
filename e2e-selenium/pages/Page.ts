import { APP_URL } from '../constants';

abstract class Page {
  protected driver: any;

  constructor(driver: any) {
    this.driver = driver;
  }

  async navigateTo() {
    await this.driver.get(APP_URL);
  }
}

export default Page;