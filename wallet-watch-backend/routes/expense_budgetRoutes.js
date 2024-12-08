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
        console.log('Query Expenses based on user Id ' + id);
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
        console.log('Query All Expenses:', res);
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
    router.post('/expenses/:userid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = crypto.randomBytes(16).toString("hex");
        const userId = req.params.userid;
        const jsonObj = Object.assign(Object.assign({}, req.body), { id, userId });
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
    // DELETE /expenses/:expenseId
    router.delete('/expenses/:expenseId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = req.params.expenseId;
        console.log('Deleting Expense with ID:', id);
        try {
            const result = yield Expense.model.deleteOne({ expenseId: id });
            if (result.deletedCount === 0) {
                res.status(404).send({ message: 'Expense not found.' });
            }
            else {
                res.send({ message: 'Expense deleted successfully.' });
            }
        }
        catch (error) {
            console.error('Error deleting expense:', error);
            res.status(500).send({ message: 'Failed to delete expense.' });
        }
    }));
    // PUT /expenses/:expenseId
    router.put('/expenses/:expenseId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = req.params.expenseId;
        const updatedData = req.body;
        console.log('Updating Expense with ID:', id);
        try {
            const result = yield Expense.model.updateOne({ expenseId: id }, { $set: updatedData });
            if (result.matchedCount === 0) {
                res.status(404).send({ message: 'Expense not found.' });
            }
            else {
                res.send({ message: 'Expense updated successfully.' });
            }
        }
        catch (error) {
            console.error('Error updating expense:', error);
            res.status(500).send({ message: 'Failed to update expense.' });
        }
    }));
    return router;
}
;
