"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const budget_service_1 = require("./budget.service");
describe('BudgetService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(budget_service_1.BudgetService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
