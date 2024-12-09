"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
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

class ConcreteUserModel extends User_1.UserModel {
  constructor(DB_CONNECTION_STRING) {
    super(DB_CONNECTION_STRING);
  }
}

// Creates and configures an ExpressJS web server.
class App {
  constructor(mongoDBConnection) {
    this.expressApp = express.default();
    this.googlePassportObj = new GooglePassport_1.default();
    this.Expense = new Expense_1.ExpenseModel(mongoDBConnection);
    this.User = new ConcreteUserModel(mongoDBConnection);
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  middleware() {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(
      (0, express_session_1.default)({
        secret: process.env.SESSION_SECRET || "default-secret-key",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set true if HTTPS is enabled
      })
    );
    this.expressApp.use((0, cookie_parser_1.default)());
    this.expressApp.use(passport_1.default.initialize());
    this.expressApp.use(passport_1.default.session());
    this.expressApp.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
  }

  validateAuth(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("User is authenticated");
      console.log(JSON.stringify(req.user));
      return next();
    }
    console.log("User is not authenticated");
    res.status(401).json({ message: "User not authenticated" });
  }

  routes() {
    const router = express.Router();

    router.get(
      "/auth/google",
      passport_1.default.authenticate("google", { scope: ["email", "profile"] })
    );

    router.get(
      "/auth/google/callback",
      passport_1.default.authenticate("google", { failureRedirect: "/" }),
      (req, res) => {
        console.log(
          "Successfully authenticated user and returned to callback page."
        );
        res.cookie("WalletWatch-Cookie", req.user, { httpOnly: true });
        res.redirect("http://localhost:4200/#/homepage");
      }
    );

    router.post("/logout", this.validateAuth, (req, res, next) => {
      req.logout((err) => {
        if (err) return next(err);
        res.clearCookie("WalletWatch-Cookie");
        req.session.destroy((err) => {
          if (err) return next(err);
          res.status(200).redirect("/");
        });
      });
    });

    router.post("/walletwatch/logs", (req, res) => {
      console.log(req.body.message);
      res.status(200).send("Log received");
    });

    router.get("/expenses", this.validateAuth, (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        if (req.isAuthenticated()) {
          console.log(req.user.id);
          res
            .status(200)
            .json({ message: "User authenticated", userId: req.user.id });
        } else {
          res.status(401).json({ message: "User not authenticated" });
        }
      })
    );

    router.get("/user", this.validateAuth, (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        if (req.isAuthenticated()) {
          res.status(200).json({ displayName: req.user.displayName });
        } else {
          res.status(401).json({ message: "User not authenticated" });
        }
      })
    );

    this.expressApp.use("/", router);
  }
}

exports.App = App;
