import { By } from 'selenium-webdriver';
import Page from './Page';

class TodoPage extends Page {
  async getTodosCount(): Promise<number> {
    const result = await this.driver.findElements(By.css('[data-cy="todo-item"]'));
    return result.length;
  }

  async getTodosTexts(): Promise<unknown> {
    const result = await this.driver.findElements(By.css('[data-cy="todo-item"] label'));
    return Promise.all(result.map((element => element.getText())));
  }
}

export default TodoPage;