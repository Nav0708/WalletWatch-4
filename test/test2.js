var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

chai.use(chaiHttp);

describe('Test Single Expense Object', function () {
    this.timeout(15000);

    let response;

    before(function (done) {
        chai.request("http://localhost:8080")
            .get("/walletwatch/expenses/1cdba60bf4213444e521bfcb4a10fb81")
            .end(function (err, res) {
                response = res;
                singleClass = response.body;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should return a single object with the expected properties', function () {
        expect(response).to.have.status(200);
        //expect(singleClass).to.have.property('amount').that.is.a('number');
        expect(singleClass[0]).to.have.property('categoryName').that.is.a('string');
        expect(singleClass[0]).to.have.property('date').that.is.a('string');
        expect(singleClass[0]).to.have.property('description').that.is.a('string');
        expect(singleClass[0]).to.have.property('userId').that.is.a('string');
    });
    it('Should return the correct class object', function () {
        console.log(singleClass[0]);
        expect(singleClass[0].categoryName).to.equal('Entertainment');
    });
    it('Should return a valid date string', function () {
        expect(singleClass[0]).to.have.property('date').that.is.a('string');
        expect(new Date(singleClass[0].date).toString()).to.not.equal('Invalid Date');
    });
    
});
