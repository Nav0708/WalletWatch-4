"use strict";
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
const testing_1 = require("@angular/core/testing");
const expenses_component_1 = require("./expenses.component");
describe('ExpensesComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            declarations: [expenses_component_1.ExpensesComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(expenses_component_1.ExpensesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should have expenses data', () => {
        expect(component.expenses.length).toBeGreaterThan(0);
    });
    it('should delete an expense', () => {
        const initialCount = component.expenses.length;
        expect(component.expenses.length).toBe(initialCount - 1);
    });
    it('should log expense for edit', () => {
        const spy = spyOn(console, 'log');
        expect(spy).toHaveBeenCalledWith('Edit Expense:', component.expenses[0]);
    });
    it('should log expense for receipt', () => {
        const spy = spyOn(console, 'log');
        expect(spy).toHaveBeenCalledWith('View receipt for:', component.expenses[0]);
    });
});
