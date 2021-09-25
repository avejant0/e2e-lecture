import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TodoRepository } from '../src/todo/todo.repository';

describe('TodoController (e2e)', () => {
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

});
