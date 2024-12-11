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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesComponent = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_2 = require("@angular/common");
const bootstrap = __importStar(require("bootstrap"));
let ExpensesComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-expenses',
            templateUrl: './expenses.component.html',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.FormsModule],
            providers: [common_2.DatePipe],
            styleUrls: ['./expenses.component.css'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExpensesComponent = _classThis = class {
        constructor(expenseService, authService, datePipe, router) {
            this.expenseService = expenseService;
            this.authService = authService;
            this.datePipe = datePipe;
            this.router = router;
            this.expenses = []; // List to store all expenses
            this.categories = ['Food', 'Rent', 'Personal', 'Entertainment', 'Transportation'];
            this.currentExpense = {
                expenseId: '',
                amount: 0,
                categoryName: '',
                date: new Date(),
                description: '',
                userId: '', // Will be set dynamically
            };
            this.editing = false;
            this.userId = '';
        }
        ngOnInit() {
            // Subscribe to the logged-in status to ensure user is authenticated
            this.authService.loggedIn$.subscribe((isLoggedIn) => {
                if (isLoggedIn) {
                    // Fetch user data after login to get the userId
                    this.authService.getUser().subscribe((req) => {
                        const userId = req.userId; // Extract userId from the response
                        console.log('user id expenses ::: ', userId);
                        if (userId) {
                            this.userId = userId; // Store the userId in the component property
                            this.fetchExpenses(userId); // Fetch expenses based on the userId
                        }
                    });
                }
                else {
                    console.log('User is not logged in');
                }
            });
        }
        fetchExpenses(userId) {
            this.expenseService.getExpensesByUserId(userId).subscribe((data) => {
                console.log('expenses data all ----:', data);
                this.expenses = data; // Store the expenses for the user
                console.log('expenses data all :', this.expenses);
            }, (error) => {
                console.error('Error fetching expenses:', error);
            });
        }
        // Navigate to a specific expense details page using expenseId
        fetchExpenseById(expenseId) {
            if (expenseId) {
                this.router.navigate(['/expenses', expenseId]); // Navigates to the expense details page
            }
            else {
                console.error('Expense ID is required to fetch details.');
            }
        }
        // fetchExpenseById(expenseId: string): void {
        //   this.expenseService.getExpenseById(expenseId).subscribe(
        //     (data: IExpenseModel) => {
        //       console.log('Fetched expense:', data); // Log the fetched expense for verification
        //       // Do something with the fetched expense, e.g., display it in a modal
        //       this.currentExpense = data; // Assign the fetched expense to a variable
        //     },
        //     (error) => {
        //       console.error('Error fetching expense:', error);
        //     }
        //   );
        // }
        // Handle form submission for adding a new expense
        onSubmit() {
            // Attach the userId to the current expense
            this.currentExpense.userId = this.userId;
            // Call the service to add the expense
            this.expenseService.addExpense(this.currentExpense).subscribe(() => {
                this.fetchExpenses(this.userId); // Fetch the updated list of expenses after adding
                this.resetForm(); // Reset the form fields
                // Close the modal
                const modalElement = document.getElementById('addExpenseModal');
                if (modalElement) {
                    // Use existing modal instance or create one if necessary
                    let modalInstance = bootstrap.Modal.getInstance(modalElement);
                    if (!modalInstance) {
                        modalInstance = new bootstrap.Modal(modalElement);
                    }
                    modalInstance.hide(); // Close the modal
                }
                window.location.reload();
            }, (error) => {
                console.error('Error adding expense:', error);
            });
        }
        // Delete an expense by expenseId
        deleteExpense(expenseId) {
            console.log('delete id', expenseId);
            this.expenseService.deleteExpense(expenseId).subscribe(() => {
                this.fetchExpenses(this.userId); // Refresh the expenses after deletion
            }, (error) => {
                console.error('Error deleting expense:', error);
            });
        }
        // Reset the form to initial values
        resetForm() {
            this.currentExpense = {
                expenseId: '',
                amount: 0,
                categoryName: '',
                date: new Date(),
                description: '',
                userId: '', // Reset userId
            };
            this.editing = false;
        }
    };
    __setFunctionName(_classThis, "ExpensesComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExpensesComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExpensesComponent = _classThis;
})();
exports.ExpensesComponent = ExpensesComponent;
