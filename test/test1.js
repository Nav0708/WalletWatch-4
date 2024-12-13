var chai = require('chai');
var chaiHttp = require('chai-http');
 
var expect = chai.expect;
 
chai.use(chaiHttp);
 
 
describe('WalletWatch API Tests', function () {
    this.timeout(15000);
 
    let getAllExpensesResponse;
    let createdExpenseId;
    const testUserId = "114209021674693580045";
 
    describe('GET: Fetch All Expenses for a Specific User', function () {
        before(function (done) {
            chai.request("https://walletwatch-4-g7dxefauf6fwh8hx.westus-01.azurewebsites.net/")
                .get(`/expenses/user/${testUserId}`) // Updated route to include userId
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
            chai.request("https://walletwatch-4-g7dxefauf6fwh8hx.westus-01.azurewebsites.net/")
                .get("/expenses/2cdba60bf4213444e521bfcb4a10fb82") // Replace with valid expense ID
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
 
    describe('POST: Create New Category', function () {
        const newCategoryData = {
                "categoryId": "13579",
                "categoryName":  "SampleTests",
                "categoryDescription": "Tracking SampleTests" };
     
        it('Should create a new category', function (done) {
          chai.request("https://walletwatch-4-g7dxefauf6fwh8hx.westus-01.azurewebsites.net/")
            .post('/categories')
            .send(newCategoryData)
            .end(function (err, res) {
              if (err) {
                done(err);
                return;
              }
     
              console.log("Response:", res.body);
              expect(res).to.have.status(201);
              expect(res.body).to.have.property('catId').that.is.a('string'); // Verify ID is returned
              expect(res.body).to.have.property('message', 'Category created successfully');
              done();
            });
        });
    });
});
 

 