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
exports.AppModule = void 0;
// Import Angular Core and Browser modules
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const http_1 = require("@angular/common/http");
const common_2 = require("@angular/common");
// Import Routing Module
const app_routes_1 = require("./app.routes");
const app_component_1 = require("./app.component");
const budget_component_1 = require("./budget/budget.component");
const expenses_component_1 = require("./expenses/expenses.component");
const homepage_component_1 = require("./homepage/homepage.component");
const reminders_component_1 = require("./reminders/reminders.component");
const welcome_component_1 = require("./welcome/welcome.component");
const profile_component_1 = require("./profile/profile.component");
// Import Application Services
const expenses_service_1 = require("./services/expenses.service"); // Expenses Service
const reminder_service_1 = require("./services/reminder.service"); // Reminders Service
const budget_service_1 = require("./services/budget.service"); // Budget Service
const homepage_service_1 = require("./services/homepage.service"); // Homepage Service
// Import Angular Material Components
const table_1 = require("@angular/material/table");
const sort_1 = require("@angular/material/sort");
const toolbar_1 = require("@angular/material/toolbar");
const icon_1 = require("@angular/material/icon");
const menu_1 = require("@angular/material/menu");
const button_1 = require("@angular/material/button");
const tooltip_1 = require("@angular/material/tooltip"); // Import MatTooltipModule
// Import Application Components
const footer_component_1 = require("./footer/footer.component");
let AppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [
                app_component_1.AppComponent,
                welcome_component_1.WelcomeComponent,
                budget_component_1.BudgetComponent,
                expenses_component_1.ExpensesComponent,
                homepage_component_1.HomepageComponent,
                reminders_component_1.RemindersComponent,
                footer_component_1.FooterComponent,
                profile_component_1.ProfileComponent // Add ProfileComponent here
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                http_1.HttpClient, // Correct import for HTTP functionality
                app_routes_1.AppRoutingModule,
                table_1.MatTableModule,
                sort_1.MatSortModule,
                toolbar_1.MatToolbarModule,
                icon_1.MatIconModule,
                menu_1.MatMenuModule,
                button_1.MatButtonModule,
                tooltip_1.MatTooltipModule // Include Tooltip module here
            ],
            providers: [
                expenses_service_1.ExpensesService, // Expenses Service
                reminder_service_1.ReminderService, // Reminders Service
                budget_service_1.BudgetService, // Budget Service
                homepage_service_1.HomepageService, // Homepage Service
                common_2.DatePipe // Provide DatePipe here
            ],
            bootstrap: [app_component_1.AppComponent]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppModule = _classThis = class {
    };
    __setFunctionName(_classThis, "AppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
})();
exports.AppModule = AppModule;
