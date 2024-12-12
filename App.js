"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const Expense_1 = require("./model/Expense");
const User_1 = require("./model/User");
const Category_1 = require("./model/Category");
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const GooglePassport_1 = __importDefault(require("./GooglePassport"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const crypto_1 = __importDefault(require("crypto"));
const path = __importStar(require("path"));
const dotenv = __importStar(require("dotenv"));
// Load environment variables from .env file
dotenv.config();
///Adding comment for git debugs
// Creates and configures an ExpressJS web server.
class App {
    constructor(mongoDBConnection) {
        this.corsOptions = {
            origin: '*',
            methods: 'GET,POST,PUT,DELETE', // Allow only certain methods
            allowedHeaders: 'Content-Type, Authorization', // Allow only specific headers
            credentials: true,
        }; /****Changing this as a part of Azure config*****/
        this.expressApp = (0, express_1.default)();
        this.googlePassportObj = new GooglePassport_1.default();
        this.Expense = new Expense_1.ExpenseModel(mongoDBConnection);
        this.User = new User_1.UserModel(mongoDBConnection);
        this.Category = new Category_1.CategoryModel(mongoDBConnection);
        //this.User = new ConcreteUserModel(mongoDBConnection);
        this.expressApp.use((0, cors_1.default)(this.corsOptions));
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.expressApp.use((0, express_session_1.default)({ secret: "keyboard cat" }));
        this.expressApp.use((0, cookie_parser_1.default)());
        this.expressApp.use(passport_1.default.initialize());
        this.expressApp.use(passport_1.default.session());
    }
    validateAuth(req, res, next) {
        if (req.isAuthenticated()) {
            console.log(`user is authenticated for ${req.path}`);
            return next();
        }
        console.log("user is not authenticated");
        res.redirect("/");
    }
    getUserId(req) {
        var _a;
        return ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || ""; // Safely access `id` with optional chaining
    }
    routes() {
        let router = express_1.default.Router();
        router.get('/welcome', (req, res) => {
            res.status(200).send('Welcome to the app!');
        });
        router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'], prompt: 'select_account' }));
        router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/homepage' }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userData = req.user;
            if (userData) {
                const data = {
                    userId: userData.id,
                    displayName: userData.displayName,
                    email: userData.emails ? userData.emails[0].value : '',
                    picture: userData.photos ? userData.photos[0].value : '',
                };
                const user = yield this.User.findOne(userData.id);
                console.log("Fine one user", user);
                if (user.length > 0) {
                    console.log('User already exists. Updating info.', data);
                    yield this.User.update(userData.id, data);
                }
                else {
                    console.log('User does not exist. Creating new user.');
                    yield this.User.create(data);
                }
                //res.redirect('http://localhost:4200/homepage'); 
                res.redirect('/homepage'); /****Changing this as a part of Azure config*****/
            }
            else {
                res.send('User not authenticated');
            }
        }));
        router.post('/logout', this.validateAuth, (req, res, next) => {
            req.logout();
            //req.clearCookie('WalletWatch-Cookie');
            res.clearCookie('connect.sid', { path: '/' });
            req.user.destroy();
            //res.status(200).redirect('http://localhost:4200/welcome');
            res.status(200).redirect('/welcome'); /****Changing this as a part of Azure config*****/
        });
        router.post('/walletwatch/logs', (req, res) => {
            console.log(req.body.message);
            res.status(200).send('Log received');
        });
        // router.get('/expenses', this.validateAuth, async (req: any, res) => {
        //     console.log(req.user.id);
        // });
        router.get('/user', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                const userData = {
                    displayName: req.user.displayName,
                    userId: req.user.id,
                    email: req.user.emails ? req.user.emails[0].value : '',
                    picture: req.user.photos ? req.user.photos[0].value : ''
                };
                res.json(userData);
            }
            else {
                res.status(401).send('User not authenticated');
            }
        }));
        router.post('/walletwatch/expenses', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const expenseId = crypto_1.default.randomBytes(16).toString("hex");
            console.log(req.user.id);
            console.log("hi adding expenses");
            try {
                const { amount, description, categoryName } = req.body;
                // Use create() method to both instantiate and save the expense
                const newExpense = yield this.Expense.model.create({
                    expenseId,
                    userId: req.user.id,
                    amount,
                    description,
                    categoryName,
                    date: new Date(),
                });
                // Save the new expense to the database
                yield newExpense.save();
                res.status(201).send('Expense added successfully');
            }
            catch (error) {
                console.error('Error adding expense:', error);
                res.status(500).send('Failed to add expense');
            }
        }));
        router.get('/walletwatch/expenses', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Retrieve all expenses for the authenticated user
                const expenses = yield this.Expense.model.find({ userId: req.user.id });
                // Return the expenses to the client
                res.status(200).json(expenses);
            }
            catch (error) {
                console.error('Error retrieving expenses:', error);
                res.status(500).send('Failed to retrieve expenses');
            }
        }));
        // Get expenses for a specific user
        router.get('/walletwatch/expenses/user/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const expenses = yield this.Expense.model.find({ userId }); // Filter expenses by userId
                res.json(expenses); // Send the filtered expenses
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error fetching expenses' });
            }
        }));
        router.get('/walletwatch/expenses/:expenseId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { expenseId } = req.params;
            try {
                const expense = yield this.Expense.model.findOne({ expenseId }); // Find by expenseId
                if (!expense) {
                    res.status(404).json({ message: 'Expense not found' });
                }
                res.json(expense);
            }
            catch (error) {
                console.error('Error fetching expense:', error);
                res.status(500).json({ message: 'Error fetching expense' });
            }
        }));
        router.delete('/walletwatch/expenses/:expenseId', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { expenseId } = req.params;
            try {
                const expense = yield this.Expense.model.findOneAndDelete({ expenseId });
                if (!expense) {
                    res.status(404).json({ message: 'Expense not found' });
                }
                res.status(200).json({ message: 'Expense deleted successfully' });
            }
            catch (error) {
                console.error('Error deleting expense:', error);
                res.status(500).json({ message: 'Error deleting expense' });
            }
        }));
        //update the individual expense 
        router.put('/walletwatch/expenses/:expenseId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { expenseId } = req.params;
            const updatedData = req.body;
            try {
                const updatedExpense = yield this.Expense.model.findOneAndUpdate({ expenseId }, updatedData, { new: true } // Return the updated document
                );
                if (!updatedExpense) {
                    res.status(404).json({ message: 'Expense not found' });
                }
                res.status(200).json(updatedExpense);
            }
            catch (error) {
                console.error('Error updating expense:', error);
                res.status(500).json({ message: 'Error updating expense' });
            }
        }));
        router.post('/walletwatch/categories', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Adding categorise");
            try {
                const { categoryId, categoryName, categoryDescription } = req.body;
                // Use create() method to both instantiate and save the expense
                const newCategory = yield this.Category.model.create({
                    categoryId,
                    categoryName,
                    categoryDescription,
                });
                // Save the new expense to the database
                yield newCategory.save();
                res.status(201).json({ catId: categoryId,
                    message: 'Category created successfully'
                });
            }
            catch (error) {
                console.error('Error adding category:', error);
                res.status(500).send('Failed to add category');
            }
        }));
        this.expressApp.use("/", router);
        this.expressApp.use(express_1.default.static(path.join(__dirname, 'dist/wallet-watch')));
        // this.expressApp.use("/jquery",express.static(__dirname + "/node_modules/jquery/dist/jquery.min.js"));
        this.expressApp.use("/bootstrap/css", express_1.default.static(__dirname + "/node_modules/bootstrap/dist/css/bootstrap.min.css"));
        this.expressApp.use("/bootstrap/js", express_1.default.static(__dirname + "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"));
        this.expressApp.use("/", express_1.default.static(__dirname + "/dist/wallet-watch/browser"));
    }
}
exports.App = App;
//testing deployment
