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
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const App_1 = require("./App");
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
dotenv.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
const PORT = 3000;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD || "walletwatch4";
const dbInfo = process.env.DB_INFO || "";
const dbProtocol = process.env.DB_PROTOCOL || "";
const mongoDBConnection = `${process.env.DB_PROTOCOL}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
let server = new App_1.App(mongoDBConnection).expressApp;
server.listen(port);
console.log("server running in port " + port);
mongoose_1.default
  .connect(mongoDBConnection)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
