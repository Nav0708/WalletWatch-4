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
exports.ExpensesDetailsComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const common_2 = require("@angular/common");
let ExpensesDetailsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-expenses-details',
            templateUrl: './expenses-details.component.html',
            styleUrls: ['./expenses-details.component.css'],
            providers: [common_1.DatePipe],
            imports: [forms_1.FormsModule, common_2.CommonModule], // Include FormsModule here
            standalone: true,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExpensesDetailsComponent = _classThis = class {
        constructor(route, router, expenseService, datePipe) {
            this.route = route;
            this.router = router;
            this.expenseService = expenseService;
            this.datePipe = datePipe;
            this.categories = ['Food', 'Rent', 'Personal', 'Entertainment', 'Transportation'];
            this.currentExpense = {
                expenseId: '',
                amount: 0,
                categoryName: '',
                date: new Date(),
                description: '',
                userId: '',
            };
        }
        ngOnInit() {
            // Extract the expenseId from the route and fetch the corresponding expense data
            this.route.paramMap.subscribe((params) => {
                const expenseId = params.get('expenseId');
                console.log('Expense ID from route:', expenseId); // For debugging
                if (expenseId) {
                    // Fetch the expense data using the extracted expenseId
                    this.fetchExpenseById(expenseId);
                }
                else {
                    console.error('No expenseId found in route');
                }
            });
        }
        loadExpense(userId) {
            this.expenseService.getExpensesByUserId(userId).subscribe((response) => {
                console.log('Fetched expense data:', response);
                if (response && response['0']) {
                    const data = response['0'];
                    console.log('No format date:', data.amount);
                    // Check if the date exists and format it
                    const formattedDate = this.datePipe.transform(data.date, 'yyyy-MM-dd');
                    console.log('Formatted date:', formattedDate);
                    // Update currentExpense with formatted date
                    this.currentExpense = Object.assign(Object.assign({}, data), { date: formattedDate ? formattedDate : data.date });
                    console.log('Updated expense data with formatted date:', this.currentExpense);
                }
                else {
                    console.error('Invalid data format or no expense data found.');
                }
            }, (error) => {
                console.error('Error fetching expense data:', error);
            });
        }
        fetchExpenseById(expenseId) {
            this.expenseService.getExpenseById(expenseId).subscribe((data) => {
                console.log('Fetched expense in details:', data);
                const formattedDate = this.datePipe.transform(data.date, 'yyyy-MM-dd');
                console.log('Formatted date:', formattedDate);
                //this.currentExpense = data; 
                this.currentExpense = Object.assign(Object.assign({}, data), { date: formattedDate ? formattedDate : data.date });
            }, (error) => {
                console.error('Error fetching expense:', error);
            });
        }
        saveExpense() {
            if (!this.currentExpense.expenseId) {
                console.error('Expense ID is required to update the expense.');
                return;
            }
            this.expenseService.updateExpense(this.currentExpense.expenseId, this.currentExpense).subscribe((updatedExpense) => {
                console.log('Expense updated successfully:', updatedExpense);
                this.router.navigate(['/expenses']);
            }, (error) => {
                console.error('Error updating expense:', error);
            });
        }
        // Cancel editing and navigate back to the list
        cancel() {
            this.router.navigate(['/expenses']);
        }
    };
    __setFunctionName(_classThis, "ExpensesDetailsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExpensesDetailsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExpensesDetailsComponent = _classThis;
})();
exports.ExpensesDetailsComponent = ExpensesDetailsComponent;
