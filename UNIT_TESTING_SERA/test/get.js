process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app.js');
const conn = require('../db/index.js');

describe('GET /list-vehicle', () => {
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err));
  })

  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  })

  it('OK, getting vehicle', (done) => {
    request(app).get('/list-vehicle')
      .then((res) => {
        const body = res.body;
        expect(body.message).to.equal("success find vehicles");
        expect(body.status).to.equal(200);
        done();
      })
      .catch((err) => done(err));
  });
})
