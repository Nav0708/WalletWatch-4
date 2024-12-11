"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesService = void 0;
const core_1 = require("@angular/core");
const environment_1 = require("../../../../environments/environment");
let ExpensesService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExpensesService = _classThis = class {
        constructor(http) {
            this.http = http;
            //private baseUrl = 'http://localhost:8080/walletwatch/expenses'; 
            this.baseUrl = environment_1.environment.hostUrl + '/walletwatch/expenses'; /****Changing this as a part of Azure config*****/
        }
        getAllExpenses() {
            return this.http.get(this.baseUrl);
        }
        getExpenses() {
            return this.http.get(environment_1.environment.hostUrl + '/walletwatch/expenses', { withCredentials: true }); /****Changing this as a part of Azure config*****/
        }
        addExpense(expense) {
            return this.http.post(environment_1.environment.hostUrl + '/walletwatch/expenses', expense, { withCredentials: true, responseType: 'text' }); /****Changing this as a part of Azure config*****/
        }
        updateExpense(expenseId, updatedExpense) {
            const apiUrl = environment_1.environment.hostUrl + `/walletwatch/expenses/${expenseId}`;
            return this.http.put(apiUrl, updatedExpense, { withCredentials: true });
        } /****Changing this as a part of Azure config*****/
        deleteExpense(expenseId) {
            const apiUrl = environment_1.environment.hostUrl + `/walletwatch/expenses/${expenseId}`;
            return this.http.delete(apiUrl, { withCredentials: true });
        } /****Changing this as a part of Azure config*****/
        getExpensesByUserId(userId) {
            console.log('get expenses by id ');
            return this.http.get(environment_1.environment.hostUrl + `/walletwatch/expenses/user/${userId}`, { withCredentials: true });
        } /****Changing this as a part of Azure config*****/
        getExpenseById(expenseId) {
            return this.http.get(environment_1.environment.hostUrl + `/walletwatch/expenses/${expenseId}`, { withCredentials: true });
        } /****Changing this as a part of Azure config*****/
    };
    __setFunctionName(_classThis, "ExpensesService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExpensesService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExpensesService = _classThis;
})();
exports.ExpensesService = ExpensesService;
