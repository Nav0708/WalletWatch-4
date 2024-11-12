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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.expenseRoutes = expenseRoutes;
const express_1 = require("express");
const crypto = __importStar(require("crypto"));
function expenseRoutes(Expense) {
    const router = (0, express_1.Router)();
    /**
     * GET /expenses/:expenseId
     * Retrieve a single expense by its unique expenseId.
     */
    router.get('/expenses/:expenseId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        var id = req.params.expenseId;
        console.log('Query Expenses based on user Id' + id);
        try {
            yield Expense.retrieveExpensesByExpenseId(res, id);
        }
        catch (error) {
            console.error('Error retrieving expenses by Id:', error);
            res.status(500).send({ message: 'Failed to retrieve expenses by Id.' });
        }
    }));
    /**
     * GET /expenses
     * Retrieve all expenses in the collection.
     */
    router.get('/expenses', (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.log('Query All Expenses');
        try {
            yield Expense.retrieveAllExpenses(res);
        }
        catch (error) {
            console.error('Error retrieving expenses:', error);
            res.status(500).send({ message: 'Failed to retrieve expenses.' });
        }
    }));
    /**
    * POST /expenses
    * Add a new expense to the collection.
    * Generates a unique expenseId for each new entry.
    */
    router.post('/expenses', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = crypto.randomBytes(16).toString("hex");
        const jsonObj = Object.assign(Object.assign({}, req.body), { expenseId: id });
        console.log(jsonObj);
        console.log("ExpenseModel:", Expense);
        try {
            yield Expense.model.create([jsonObj]);
            res.send('{"id":"' + id + '"}');
        }
        catch (e) {
            console.error(e);
            console.log('object creation failed');
        }
    }));
    return router;
}
;
