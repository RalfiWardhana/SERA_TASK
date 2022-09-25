process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app.js');
const conn = require('../db/index.js');

const result = {
  brand:"Merchedes",
  desc:"Merchedes from Germany",
  car:[
      {
          name:"A - Class Saloon",
          price:2400000000,
          size:"4 people",
          Cc:5000
      }

  ]
}

describe('POST /add-vehicle', () => {
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

  it('OK, creating a new vehicle', (done) => {
    request(app).post('/add-vehicle')
      .send(result)
      .then((res) => {
        const body = res.body.add;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('brand');
        expect(body).to.contain.property('desc');
        expect(res.body.message).to.equal("success to add Vehicle");
        expect(res.body.status).to.equal(201);
        done();
      })
      .catch((err) => done(err));
  });

  it('Fail, vehicle bad response', (done) => {
    request(app).post('/add-vehicle')
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
