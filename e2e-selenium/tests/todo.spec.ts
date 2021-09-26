import { Builder, By, Key, until } from 'selenium-webdriver';
import TodoPage from '../pages/TodoPage';
describe('Todo Test', () => {
  let todoPage: TodoPage;
 
  beforeAll(async () => {
    const driver = new Builder().forBrowser('chrome').build();
    todoPage = new TodoPage(driver);
  });

  it('should show correct count of todo items', async () => {
    await todoPage.navigateTo();
    const count = await todoPage.getTodosCount();
    const texts = await todoPage.getTodosTexts();
    expect(count).toEqual(2);
    expect(texts).toEqual(["Feed the cat", "Brush the teeth"]);
  });
});