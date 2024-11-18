var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

chai.use(chaiHttp);

describe('Test Single Expense Object', function () {
    this.timeout(15000);

    let response;

    before(function (done) {
        chai.request("http://localhost:3000")
            .get("/walletwatch/expenses")
            .end(function (err, res) {
                response = res;
                done();
            });
    });

    it('Should return a single object with the expected properties', function () {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array').that.has.length.above(1); // Ensure it's an array with one object
        const expense = response.body[0]; // Grab the first object if it's an array
        expect(expense).to.be.an('object');
        expect(expense).to.have.property('amount').that.is.a('number');
        expect(expense).to.have.property('categoryId').that.is.a('string');
        expect(expense).to.have.property('date').that.is.a('string');
        expect(expense).to.have.property('description').that.is.a('string');
        expect(expense).to.have.property('userId').that.is.a('string');
    });
});
