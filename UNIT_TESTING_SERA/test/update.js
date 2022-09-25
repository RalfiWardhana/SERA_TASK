process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app.js');
const conn = require('../db/index.js');

const result = {
  id : "632dd1c32f208e50b0dac83a",
  brand : "Honda",
  desc : "Honda from japan",
  car : [
      {
          name: "CR-V",
          price: 400000000,
          size: "8 people",
          Cc: 37000
      },
      {
          name: "HR-V",
          price: 270000000,
          size: "5 people",
          Cc: 2700
      }
  ]
}


describe('PUT /update-vehicle', () => {
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

  it('OK, updating a vehicle', (done) => {
    request(app).put('/update-vehicle')
      .send(result)
      .then((res) => {
        const body = res.body.add;
        expect(res.body.message).to.equal("success update vehicle");
        expect(res.body.status).to.equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  it('Fail, vehicle updating bad response', (done) => {
    request(app).put('/update-vehicle')
      .send({ name: 'NOTE' })
      .then((res) => {
        const body = res.body;
        expect(body.status)
          .to.equal(400)
        done();
      })
      .catch((err) => done(err));
  });
})
