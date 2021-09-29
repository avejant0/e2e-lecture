import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TodoRepository } from '../src/todo/todo.repository';

describe('TodoController (e2e)', () => {
  const uuidv4RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const todoRepository = new TodoRepository();
    await todoRepository.clearAll();
  });

  describe('GET /api/todos', () => {
    it('should return 0 todos by default', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get('/api/todos');
      
      expect(status).toEqual(200);
      expect(body.length).toEqual(0);
    });
  });

  describe('POST /api/todos', () => {
    it('should add todo successfully', async () => {
      const todoToAdd = { content: 'Study English' };
      const { status, body } = await request(app.getHttpServer())
        .post('/api/todos')
        .send(todoToAdd);

      expect(status).toEqual(201);

      expect(body).toEqual({
        id: expect.stringMatching(uuidv4RegExp),
        content: 'Study English',
        isDone: false
      });
    });

    it('should update database with newtodo after successful request', async () => {
      const todoToAdd = { content: 'Study English' };
      await request(app.getHttpServer())
        .post('/api/todos')
        .send(todoToAdd)
        .expect(201);

      const { body: todos } = await request(app.getHttpServer())
        .get('/api/todos')
        .expect(200);

      expect(todos.length).toEqual(1);
      expect(todos[0]).toEqual({
        id: expect.stringMatching(uuidv4RegExp),
        content: 'Study English',
        isDone: false
      });

    });

  });
});
