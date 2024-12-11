"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const expenses_service_1 = require("./expenses.service");
describe('ExpensesService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(expenses_service_1.ExpensesService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
