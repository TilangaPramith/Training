const chai = require('chai');
const chaiHttp = require("chai-http");
const app = require('../App');

chai.should();

chai.use(chaiHttp);

describe("Task Api", () => {

    describe("GET /data/getData", () => {
        it('it should be GET correct data', (done) => {
            chai.request(app)
            .get("/data/getData")
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a( "array" );
                res.body.length.should.be.equal(2);
            done();
            })
        })
            
    }) 

    describe("POST /data/getData", () => {
        it('it should be GET correct data', (done) => {
            chai.request(app)
            .post("/data/getData")
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a( "array" );
                res.body.length.should.be.equal(2);
            done();
            })
        })
    }) 

})