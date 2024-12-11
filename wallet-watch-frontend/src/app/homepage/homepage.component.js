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
exports.HomepageComponent = void 0;
const core_1 = require("@angular/core");
const chart_js_1 = require("chart.js");
chart_js_1.Chart.register(...chart_js_1.registerables);
let HomepageComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-homepage',
            templateUrl: './homepage.component.html',
            standalone: true,
            styleUrls: ['./homepage.component.css']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _barGraph_decorators;
    let _barGraph_initializers = [];
    let _barGraph_extraInitializers = [];
    var HomepageComponent = _classThis = class {
        ngAfterViewInit() {
            if (typeof window !== 'undefined') {
                const ctx = this.barGraph.nativeElement.getContext('2d');
                if (ctx) {
                    new chart_js_1.Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                            datasets: [{
                                    label: 'Expenses ($)',
                                    data: [100, 200, 150, 300, 250],
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    borderWidth: 1
                                }]
                        },
                        options: {
                            responsive: true,
                            scales: {
                                y: { beginAtZero: true }
                            }
                        }
                    });
                }
            }
        }
        constructor() {
            this.barGraph = __runInitializers(this, _barGraph_initializers, void 0);
            __runInitializers(this, _barGraph_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "HomepageComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _barGraph_decorators = [(0, core_1.ViewChild)('barGraph', { static: false })];
        __esDecorate(null, null, _barGraph_decorators, { kind: "field", name: "barGraph", static: false, private: false, access: { has: obj => "barGraph" in obj, get: obj => obj.barGraph, set: (obj, value) => { obj.barGraph = value; } }, metadata: _metadata }, _barGraph_initializers, _barGraph_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HomepageComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HomepageComponent = _classThis;
})();
exports.HomepageComponent = HomepageComponent;
