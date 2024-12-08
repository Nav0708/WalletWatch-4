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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const Mongoose = __importStar(require("mongoose"));
class UserModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            userID: String,
            username: String,
            password: String,
            email: String,
            role: String,
        }, { collection: 'users' });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
                this.model = Mongoose.model('User', this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    changePassword(response, userID, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            // Hash the new password before saving to the database
            try {
                const result = yield this.model.updateOne({ userID: userID }, { password: newPassword });
                if (result.nModified === 1) {
                    response.json({ message: "User password changed successfully." });
                }
                else {
                    response.status(404).send("User not found.");
                }
            }
            catch (e) {
                console.error(e);
                response.status(500);
            }
        });
    }
    deleteAccount(response, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.deleteOne({ userID: userID });
                if (result.deletedCount === 1) {
                    response.json({ message: "User account deleted successfully." });
                }
                else {
                    response.status(404).send("User not found.");
                }
            }
            catch (e) {
                console.error(e);
                response.status(500);
            }
        });
    }
}
exports.UserModel = UserModel;
