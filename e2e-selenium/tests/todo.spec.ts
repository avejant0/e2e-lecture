import { Builder, By, Key, until } from 'selenium-webdriver';
import TodoPage from '../pages/TodoPage';
describe('Todo Test', () => {
  let todoPage: TodoPage;
  let driver;
  beforeAll(async () => {
    driver = new Builder().forBrowser('chrome').build();
    todoPage = new TodoPage(driver);
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should show correct count of todo items', async () => {
    await todoPage.navigateTo();
    const count = await todoPage.getTodosCount();
    const texts = await todoPage.getTodosTexts();
    expect(count).toEqual(2);
    expect(texts).toEqual(["Feed the cat", "Brush the teeth"]);
  });
});