import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

jest.mock('../src/task.dbapi');

describe('AppController (e2e) (mocked db)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/ (GET)', () => {
    it('returns 404', (done) => {
      return request(app.getHttpServer()).get('/').expect(404, done);
    });
  });

  describe('/ping (GET)', () => {
    it('returns "pong"', (done) => {
      return request(app.getHttpServer())
        .get('/ping')
        .expect(200)
        .expect('pong', done);
    });
  });

  function expectField(response: string, name: string, value: unknown) {
    const json = JSON.parse(response);
    expect(json[name]).toBe(value);
  }

  describe('/start_task (GET)', () => {
    it('returns json on "?title=task1&description=test1"', (done) => {
      return request(app.getHttpServer())
        .get('/start_task?title=task1&description=test1')
        .expect('Content-Type', /application\/json/i)
        .expect(200, done);
    });

    it('returns statusCode:200 on "?title=task1&description=test1"', (done) => {
      return request(app.getHttpServer())
        .get('/start_task?title=task1&description=test1')
        .expect('Content-Type', /application\/json/i)
        .expect(200)
        .then((response) => {
          expectField(response.text, 'statusCode', 200);
          done();
        })
        .catch((err) => done(err));
    });

    it('errors on "?description=test1"', (done) => {
      return request(app.getHttpServer())
        .get('/start_task?description=test1')
        .expect('Content-Type', /application\/json/i)
        .expect(412, done);
    });

    it('errors on "?title=&description=test1"', (done) => {
      return request(app.getHttpServer())
        .get('/start_task?title=&description=test1')
        .expect('Content-Type', /application\/json/i)
        .expect(412, done);
    });

    it('returns json on "?title=task1"', (done) => {
      return request(app.getHttpServer())
        .get('/start_task?title=test1')
        .expect('Content-Type', /application\/json/i, done);
    });
  });

  describe('/stop_task (GET)', () => {
    it('returns json on empty query', (done) => {
      return request(app.getHttpServer())
        .get('/stop_task')
        .expect('Content-Type', /application\/json/i)
        .expect(200, done);
    });

    it('returns statusCode:200 on empty query', (done) => {
      return request(app.getHttpServer())
        .get('/stop_task')
        .expect('Content-Type', /application\/json/i)
        .expect(200)
        .then((response) => {
          expectField(response.text, 'statusCode', 200);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('/get_current_task (GET)', () => {
    it('returns json on empty query', (done) => {
      return request(app.getHttpServer())
        .get('/get_current_task')
        .expect('Content-Type', /application\/json/i)
        .expect(200, done);
    });

    it('returns statusCode:200 on empty query', (done) => {
      return request(app.getHttpServer())
        .get('/get_current_task')
        .expect('Content-Type', /application\/json/i)
        .expect(200)
        .then((response) => {
          expectField(response.text, 'statusCode', 200);
          done();
        })
        .catch((err) => done(err));
    });
  });
});
