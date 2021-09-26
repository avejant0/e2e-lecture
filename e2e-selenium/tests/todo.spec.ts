import { Builder, By, Key, until } from 'selenium-webdriver';

describe('Todo Test', () => {
  const rootURL = 'http://localhost:3000';
  let driver;
  beforeAll(async () => {
    driver = new Builder().forBrowser('chrome').build();
  });

  it('tmp', async () => {
    await driver.get(rootURL);
  });
});