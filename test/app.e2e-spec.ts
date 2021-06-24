import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
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
});
