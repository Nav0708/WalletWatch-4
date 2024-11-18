var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

chai.use(chaiHttp);

describe('Test To Do lists result', function () {
    this.timeout(15000);

    let requestResult;
    let response;

    before(function (done) {
        chai.request("http://localhost:3000")
            .get("/walletwatch/expenses")
            .end(function (err, res) {
                if (err) {
                    done(err); // Handle errors explicitly
                    return;
                }
                requestResult = res.body;
                response = res;
                console.log(res.request.url);
                done();
            });
    });

    it('Should return an array object with three objects', function () {
        expect(response).to.have.status(200);
        expect(response).to.be.json; // Ensure response is JSON
        expect(response.body).to.be.an('array').that.has.length.above(1); // Validate response body
    });

    it('The elements in the array have the expected properties', function () {
        response.body.forEach((item) => {
            expect(item).to.have.property('expenseId');
            expect(item).to.have.property('amount');
            expect(item).to.have.property('categoryId');
            expect(item).to.have.property('date');
            expect(item).to.have.property('description');
            expect(item).to.have.property('userId');
            expect(item.categoryId).to.be.a('string').that.has.length(1);
            expect(item.description).to.be.a('string');
        });
    });
});
