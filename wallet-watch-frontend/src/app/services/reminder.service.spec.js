"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const reminder_service_1 = require("./reminder.service");
describe('ReminderService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(reminder_service_1.ReminderService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
