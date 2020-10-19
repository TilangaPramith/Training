const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../App');

chai.should();

chai.use(chaiHttp);

// eslint-disable-next-line no-undef
describe('Task Api', () => {
  // eslint-disable-next-line no-undef
  describe('GET /data/getData', () => {
    // eslint-disable-next-line no-undef
    it('it should be GET correct data', (done) => {
      chai.request(app)
        .get('/data/getData')
        .type('json')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.equal(2);
          done();
        });
    });
    // eslint-disable-next-line no-undef
    it('invalid JSON', (done) => {
      chai.request(app)
        .get('/data/getData')
        .type('invalid json')
        .end((err, res) => {
          console.log(res.error);
          done();
        });
    });
  });

  // eslint-disable-next-line no-undef
  describe('POST /data/getData', () => {
    // eslint-disable-next-line no-undef
    it('it should be GET correct data', (done) => {
      chai.request(app)
        .post('/data/getData')
        .type('json')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.equal(2);
          done();
        });
    });
    // eslint-disable-next-line no-undef
    it('invalid JSON', (done) => {
      chai.request(app)
        .post('/data/getData')
        .type('invalid json')
        .end((err, res) => {
          console.log(res.error);
          done();
        });
    });
  });
});
