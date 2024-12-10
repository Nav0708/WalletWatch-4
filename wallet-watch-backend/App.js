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
const express = __importStar(require("express"));
const bodyParser = __importStar(require("body-parser"));
const Expense_1 = require("./model/Expense");
const User_1 = require("./model/User");
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const GooglePassport_1 = __importDefault(require("./GooglePassport"));
const passport_1 = __importDefault(require("passport"));
// Creates and configures an ExpressJS web server.
class App {
    constructor(mongoDBConnection) {
        this.corsOptions = {
            origin: 'http://localhost:4200',
            methods: 'GET,POST,PUT,DELETE', // Allow only certain methods
            allowedHeaders: 'Content-Type, Authorization', // Allow only specific headers
            credentials: true,
        };
        this.expressApp = express.default();
        this.googlePassportObj = new GooglePassport_1.default();
        this.Expense = new Expense_1.ExpenseModel(mongoDBConnection);
        this.User = new User_1.UserModel(mongoDBConnection);
        //this.User = new ConcreteUserModel(mongoDBConnection);
        //this.expressApp.use(cors(this.corsOptions));
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((0, express_session_1.default)({
            secret: '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',
            resave: false,
            saveUninitialized: false,
            cookie: { secure: true } // Set to true if using HTTPS
        }));
        this.expressApp.use((0, cookie_parser_1.default)());
        //this.expressApp.use(cors(corsOptions));
        //this.expressApp.options('*', cors(corsOptions));
        this.expressApp.use(passport_1.default.initialize());
        this.expressApp.use(passport_1.default.session());
        this.expressApp.use((req, res, next) => {
            this.expressApp.options('*', (req, res) => {
                res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
                res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.sendStatus(200);
            });
            next();
        });
    }
    validateAuth(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/');
    }
    routes() {
        let router = express.Router();
        router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
        router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.isAuthenticated()) {
                const userData = req.user;
                const data = {
                    userId: req.user.id,
                    firstName: req.user.displayName,
                    lastName: req.user.familyName,
                    email: req.user.emails ? req.user.emails[0].value : '',
                    picture: req.user.photos ? req.user.photos[0].value : '',
                };
                const user = yield this.User.findOne(req.user.id);
                if (user) {
                    console.log('User already exists. Updating info.', data);
                    yield this.User.update(req.user.id, data);
                }
                else {
                    console.log('User does not exist. Creating new user.');
                    yield this.User.create(data);
                }
                console.log(`Session user: ${JSON.stringify(req.session)}`);
                res.redirect('http://localhost:4200/#/homepage');
            }
            else {
                res.send('User not authenticated');
            }
        }));
        router.post('/logout', this.validateAuth, (req, res, next) => {
            req.logout();
            req.clearCookie('WalletWatch-Cookie');
            req.session.destroy();
            res.status(200).redirect('/#/welcome');
        });
        router.post('/walletwatch/logs', (req, res) => {
            console.log(req.body.message);
            res.status(200).send('Log received');
        });
        router.get('/expenses', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.user.id);
        }));
        router.get('/user', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.isAuthenticated()) {
                const userData = {
                    displayName: req.user.displayName,
                    userId: req.user.id,
                    email: req.user.emails ? req.user.emails[0].value : '',
                    photo: req.user.photos ? req.user.photos[0].value : ''
                };
                res.json(userData);
            }
            else {
                res.status(401).send('User not authenticated');
            }
        }));
        this.expressApp.use('/', router);
        // this.expressApp.use('/walletwatch/', expenseRoutes(this.Expense));
        //this.expressApp.use('/', router);
        //this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
        //this.expressApp.use('/images', express.static(__dirname+'/img'));
        //this.expressApp.use('/', express.static(__dirname+'/pages'));
    }
}
exports.App = App;
