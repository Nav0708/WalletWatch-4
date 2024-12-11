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
const budget_component_1 = require("./budget.component");
describe('BudgetComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            declarations: [budget_component_1.BudgetComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(budget_component_1.BudgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should have budgets data', () => {
        expect(component.budgets.length).toBeGreaterThan(0);
    });
    it('should delete a budget', () => {
        const initialCount = component.budgets.length;
        component.onDelete(component.budgets[0]);
        expect(component.budgets.length).toBe(initialCount - 1);
    });
    it('should log budget for edit', () => {
        const spy = spyOn(console, 'log');
        component.onEdit(component.budgets[0]);
        expect(spy).toHaveBeenCalledWith('Edit Budget:', component.budgets[0]);
    });
});
