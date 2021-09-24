import { Injectable } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';

import Todo from './todo.model';

@Injectable()
export class TodoRepository {
  private readonly collectionName: string = 'todos';
  private db: lowdb.LowdbAsync<any> = null;
 
  public async findAll(): Promise<Todo[]> {
    if (this.db === null) {
      await this.init();
    }
    const todos = await this.db.get(this.collectionName).value();
    return todos;
  }

  public async create(todo: Todo): Promise<Todo> {
    if (this.db === null) {
      await this.init();
    }
    const todos = await this.db.get(this.collectionName).value();
    todos.push(todo);
    await this.db.set(this.collectionName, todos).write();
    return todo;
  }

  private async init(): Promise<void> {
    const adapter = new FileAsync('./src/db/db.json');
    this.db = await lowdb(adapter);
    const todos = await this.db.get(this.collectionName).value();
    if (!todos) {
      await this.db.set(this.collectionName, []).write();
    }
  }

}