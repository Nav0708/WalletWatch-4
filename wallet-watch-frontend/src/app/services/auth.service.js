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
exports.AuthService = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let AuthService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = _classThis = class {
        constructor(http) {
            this.http = http;
            this.loggedInSubject = new rxjs_1.BehaviorSubject(this.isLoggedIn());
            this.userSubject = new rxjs_1.BehaviorSubject(localStorage.getItem('user'));
            this.apiUrl = 'http://localhost:8080/';
            //private apiUrl = environment.hostUrl; // Using the environment variable
            this.welcomepage = '/welcome'; // Define your application's welcome page route
            this.loggedIn$ = this.loggedInSubject.asObservable();
            this.user$ = this.userSubject.asObservable();
        }
        /** Login and set the local state */
        login() {
            localStorage.setItem('loggedIn', 'true');
            this.loggedInSubject.next(true);
            this.getUserProfile(); // Fetch user profile after login
        }
        /** Logout and clear the local state */
        logout() {
            localStorage.clear();
            this.loggedInSubject.next(false);
            this.userSubject.next(null);
            location.assign(this.welcomepage); // Redirect to the welcome page
        }
        /** Fetch the user profile from the backend */
        getUserProfile() {
            if (this.isLoggedIn()) {
                console.log('Fetching user profile...');
                return this.http.get(`${this.apiUrl}user`, { withCredentials: true }).pipe((0, operators_1.tap)((response) => {
                    console.log('User profile data:', response);
                    localStorage.setItem('user', JSON.stringify(response));
                    this.setUser(response);
                }), (0, operators_1.catchError)((error) => {
                    console.error('Error fetching user profile:', error);
                    return (0, rxjs_1.throwError)(() => error);
                }));
            }
            else {
                console.log('User is not logged in');
                return (0, rxjs_1.throwError)(() => new Error('User not logged in'));
            }
        }
        /** Update the user data in the frontend */
        setUser(user) {
            this.userSubject.next(user);
        }
        /** Check if the user is logged in */
        isLoggedIn() {
            return localStorage.getItem('loggedIn') === 'true';
        }
        /** Retrieve user details from the backend */
        getUser() {
            return this.http.get(`${this.apiUrl}user`, { withCredentials: true });
        }
        /** Synchronize the login state with the local storage */
        updateLoginState() {
            this.loggedInSubject.next(this.isLoggedIn());
        }
    };
    __setFunctionName(_classThis, "AuthService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
})();
exports.AuthService = AuthService;
