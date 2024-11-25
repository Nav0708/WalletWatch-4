var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

chai.use(chaiHttp);

describe('Test To Do lists result', function () {
    this.timeout(15000);

    let requestResult;
    let response;

    before(function (done) {
        chai.request("http://localhost:8080")
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
    it('Should return an array object with more than 2 objects', function () {
        expect(response).to.have.status(200);
        expect(response.body).to.have.length.above(2);
        expect(response).to.have.headers;
    });

    it('The first entry in the array has known properties', function () {
        expect(requestResult[0]).to.include.keys('categoryName');
        expect(requestResult[0]).to.have.property('amount');
        expect(requestResult[0]).to.have.property('expenseId');
        expect(requestResult).to.not.be.a.string;
    });

    it('The elements in the array have the expected properties', function () {
        expect(requestResult).to.satisfy(function (element){
            for (let i = 0; i < element.length; i++) {
                console.log(element);
            expect(element[i]).to.have.property('expenseId');
            expect(element[i]).to.have.property('amount');
            expect(element[i]).to.have.property('date');
            expect(element[i]).to.have.property('description');
            expect(element[i]).to.have.property('userId');
            expect(element[i].categoryName).to.be.a('string').that.has.length.above(3);;
            expect(element[i].description).to.be.a('string');
        }
        return true;
    });
    });
});
