var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

chai.use(chaiHttp);

describe('WalletWatch API Tests', function () {
    this.timeout(15000);

    let getAllExpensesResponse;
    //let getSingleExpenseResponse;
    let createdExpenseId;

    describe('GET: Fetch All Expenses', function () {
        before(function (done) {
            chai.request("http://localhost:8080")
                .get("/walletwatch/expenses")
                .end(function (err, res) {
                    if (err) {
                        done(err);
                        return;
                    }
                    getAllExpensesResponse = res.body;
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('Should return an array object with more than 2 objects', function () {
            expect(getAllExpensesResponse).to.be.an('array').with.length.above(2);
        });

        it('The first entry in the array has known properties', function () {
            expect(getAllExpensesResponse[0]).to.include.keys('categoryName', 'amount', 'expenseId', 'date', 'description', 'userId');
        });

        it('The elements in the array have the expected properties', function () {
            getAllExpensesResponse.forEach(element => {
                expect(element).to.have.property('expenseId').that.is.a('string');
                expect(element).to.have.property('amount').that.is.a('number');
                expect(element).to.have.property('date').that.is.a('string');
                expect(element).to.have.property('description').that.is.a('string');
                expect(element).to.have.property('userId').that.is.a('string');
                expect(element.categoryName).to.be.a('string').that.has.length.above(3);
            });
        });
    });

    describe('GET: Fetch Single Expense by ID', function () {
        let getSingleExpenseResponse;
        
        before(function (done) {
            chai.request("http://localhost:8080")
                .get("/walletwatch/expenses/1cdba60bf4213444e521bfcb4a10fb81") // Replace with valid expense ID
                .end(function (err, res) {
                    if (err) {
                        done(err);
                        return;
                    }
                    getSingleExpenseResponse = res.body; // Assumes it's a single object, not an array
                    expect(res).to.have.status(200);
                    done();
                });
        });
    
        it('Should return a single object with the expected properties', function () {
            const expense = Array.isArray(getSingleExpenseResponse) ? getSingleExpenseResponse[0] : getSingleExpenseResponse;
            expect(expense).to.have.all.keys('amount', 'categoryName', 'date', 'description', 'userId', 'expenseId', '_id');  // Include '_id'
        });
    
        it('Should return a valid date string', function () {
            const expense = getSingleExpenseResponse[0] || getSingleExpenseResponse;
            expect(new Date(expense.date).toString()).to.not.equal('Invalid Date');
        });
    });

    describe('POST: Create New Expense', function () {
        const newExpenseData = {
            categoryName: "Utilities",
            amount: 200,
            date: "2024-12-01",
            description: "Electricity Bill",
            userId: "123456789"
        };

        it('Should create a new expense', function (done) {
            chai.request("http://localhost:8080")
                .post("/walletwatch/expenses/123456789")
                .send(newExpenseData)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                        return;
                    }
                    expect(res).to.have.status(200);
                    expect(res.body).to.include.keys('expenseId');
                    createdExpenseId = res.body.expenseId; // Store for cleanup
                    done();
                });
        });
    });

    after('Cleanup: Delete created expense', function (done) {
        if (createdExpenseId) {
            chai.request("http://localhost:8080")
                .delete(`/walletwatch/expenses/${createdExpenseId}`)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                        return;
                    }
                    expect(res).to.have.status(200);
                    done();
                });
        } else {
            done();
        }
    });
});

 


/* var chai = require('chai');
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
}); */
